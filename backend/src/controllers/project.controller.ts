import type { Request, Response } from "express";
import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";
import slugify from "slugify";
import unzipper from "unzipper";

import { prisma } from "../config/database";
import {
  createProjectStagingDirectory,
  ensureProjectStorage,
  getProjectStoragePath,
  removeProjectStagingDirectory,
  removeProjectStorage,
} from "../utils/storage";

export async function getProjects(_req: Request, res: Response) {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(projects);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch projects",
    });
  }
}

export async function getProject(req: Request, res: Response) {
  try {
    const project = await prisma.project.findUnique({
      where: {
        slug: req.params.slug,
      },
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    return res.json(project);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch project",
    });
  }
}

export async function createProject(req: Request, res: Response) {
  let slug: string | undefined;
  let stagingPath: string | null = null;

  try {
    const {
      name,
      description,
      location,
      year,
      category,
      featured,
      slug: requestedSlug,
    } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Project name is required",
      });
    }

    if (!req.files || !Array.isArray(req.files) || req.files.length !== 1) {
      return res.status(400).json({
        message: "Please upload exactly one ZIP file",
      });
    }

    const uploadedFile = req.files[0];

    if (!uploadedFile.originalname.toLowerCase().endsWith(".zip")) {
      return res.status(400).json({
        message: "Project file must be a ZIP archive",
      });
    }

    slug =
      requestedSlug ||
      slugify(name, {
        lower: true,
        strict: true,
        trim: true,
      });

    const existingProject = await prisma.project.findUnique({
      where: {
        slug,
      },
    });

    if (existingProject) {
      return res.status(409).json({
        message: "A project with this slug already exists",
      });
    }

    /*
     * ---------------------------------------------------------
     * 1. Create temporary staging directory
     * ---------------------------------------------------------
     */

    stagingPath = await createProjectStagingDirectory(slug);

    /*
     * ---------------------------------------------------------
     * 2. Extract ZIP
     * ---------------------------------------------------------
     */

    await new Promise<void>((resolve, reject) => {
      const readStream = fsSync.createReadStream(uploadedFile.path);

      const extractStream = unzipper.Extract({
        path: stagingPath!,
      });

      readStream.on("error", reject);
      extractStream.on("error", reject);
      extractStream.on("close", resolve);

      readStream.pipe(extractStream);
    });

    /*
     * ZIP is no longer needed.
     */

    await fs.rm(uploadedFile.path, {
      force: true,
    });

    /*
     * ---------------------------------------------------------
     * 3. Find index.html
     * ---------------------------------------------------------
     */

    async function findEntryFile(directory: string): Promise<string | null> {
      const entries = await fs.readdir(directory, {
        withFileTypes: true,
      });

      for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);

        if (entry.isFile() && entry.name.toLowerCase() === "index.html") {
          return fullPath;
        }

        if (entry.isDirectory()) {
          const result = await findEntryFile(fullPath);

          if (result) {
            return result;
          }
        }
      }

      return null;
    }

    const entryPath = await findEntryFile(stagingPath);

    if (!entryPath) {
      throw new Error('The uploaded ZIP does not contain an "index.html" file');
    }

    /*
     * ---------------------------------------------------------
     * 4. Normalize project root
     * ---------------------------------------------------------
     *
     * Example:
     *
     * staging/
     *   05-Walin lnk fiile/
     *     index.html
     *     script.js
     *     media/
     *
     * becomes:
     *
     * staging/
     *   index.html
     *   script.js
     *   media/
     */

    const relativeEntryPath = path.relative(stagingPath, entryPath);

    const entryDirectory = path.dirname(relativeEntryPath);

    if (entryDirectory !== ".") {
      const wrapperPath = path.join(stagingPath, entryDirectory);

      const wrapperEntries = await fs.readdir(wrapperPath);

      /*
       * Move everything from the wrapper directory
       * directly into staging.
       */
      for (const entry of wrapperEntries) {
        const source = path.join(wrapperPath, entry);
        const destination = path.join(stagingPath, entry);

        await fs.rename(source, destination);
      }

      /*
       * Remove now-empty wrapper directories.
       */
      await fs.rm(wrapperPath, {
        recursive: true,
        force: true,
      });
    }

    /*
     * ---------------------------------------------------------
     * 5. Verify index.html
     * ---------------------------------------------------------
     */

    const finalEntryPath = path.join(stagingPath, "index.html");

    if (!fsSync.existsSync(finalEntryPath)) {
      throw new Error(
        'The uploaded ZIP could not be prepared with "index.html" at its root',
      );
    }

    /*
     * ---------------------------------------------------------
     * 6. Verify extracted files
     * ---------------------------------------------------------
     */

    const mediaPath = path.join(stagingPath, "media");

    if (fsSync.existsSync(mediaPath)) {
      console.log("VR media directory detected:", mediaPath);
    } else {
      console.warn(
        "Warning: uploaded project does not contain a media directory",
      );
    }

    /*
     * Count extracted files for debugging.
     */

    async function countFiles(directory: string): Promise<number> {
      let count = 0;

      const entries = await fs.readdir(directory, {
        withFileTypes: true,
      });

      for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);

        if (entry.isFile()) {
          count++;
        } else if (entry.isDirectory()) {
          count += await countFiles(fullPath);
        }
      }

      return count;
    }

    const extractedFileCount = await countFiles(stagingPath);

    console.log(`Extracted ${extractedFileCount} files for project "${slug}"`);

    /*
     * ---------------------------------------------------------
     * 7. Move into permanent storage
     * ---------------------------------------------------------
     */

    const projectStoragePath = await ensureProjectStorage(slug);

    await fs.rm(projectStoragePath, {
      recursive: true,
      force: true,
    });

    await fs.rename(stagingPath, projectStoragePath);

    stagingPath = null;

    /*
     * ---------------------------------------------------------
     * 8. Create database record
     * ---------------------------------------------------------
     */

    const project = await prisma.project.create({
      data: {
        name,
        slug,
        description,
        location,
        year: year ? Number(year) : null,
        category,
        featured: featured === "true" || featured === true,
        projectPath: `vr-projects/${slug}`,
        entryFile: "index.html",
      },
    });

    return res.status(201).json(project);
  } catch (error) {
    console.error("Failed to create project:", error);

    if (stagingPath) {
      await removeProjectStagingDirectory(stagingPath).catch(() => {});
    }

    if (slug) {
      await removeProjectStorage(slug).catch(() => {});
    }

    return res.status(500).json({
      message: "Failed to create project",
    });
  }
}

export async function deleteProject(req: Request, res: Response) {
  try {
    const project = await prisma.project.findUnique({
      where: {
        slug: req.params.slug,
      },
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    await prisma.project.delete({
      where: {
        slug: project.slug,
      },
    });

    await removeProjectStorage(project.slug);

    return res.json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to delete project",
    });
  }
}

export async function updateProject(req: Request, res: Response) {
  try {
    const { slug } = req.params;

    const existingProject = await prisma.project.findUnique({
      where: {
        slug,
      },
    });

    if (!existingProject) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const { name, description, location, year, category, featured } = req.body;

    const project = await prisma.project.update({
      where: {
        slug,
      },
      data: {
        ...(name !== undefined && {
          name,
        }),

        ...(description !== undefined && {
          description,
        }),

        ...(location !== undefined && {
          location,
        }),

        ...(year !== undefined && {
          year: year === null || year === "" ? null : Number(year),
        }),

        ...(category !== undefined && {
          category,
        }),

        ...(featured !== undefined && {
          featured: featured === true || featured === "true",
        }),
      },
    });

    return res.json(project);
  } catch (error) {
    console.error("Failed to update project:", error);

    return res.status(500).json({
      message: "Failed to update project",
    });
  }
}

export async function replaceProjectFiles(req: Request, res: Response) {
  let stagingPath: string | null = null;

  try {
    const { slug } = req.params;

    const project = await prisma.project.findUnique({
      where: {
        slug,
      },
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return res.status(400).json({
        message: "Project files are required",
      });
    }

    const files = req.files as Express.Multer.File[];

    let paths = req.body.paths;

    stagingPath = await createProjectStagingDirectory(slug);

    /*
     * Copy uploaded files into the staging directory.
     * Nothing in the currently live project is touched yet.
     */

    if (!paths) {
      return res.status(400).json({
        message: "File paths are required",
      });
    }

    if (!Array.isArray(paths)) {
      paths = [paths];
    }

    if (paths.length !== files.length) {
      return res.status(400).json({
        message: "File paths count does not match uploaded files",
      });
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const relativePath = paths[i];

      if (!relativePath || typeof relativePath !== "string") {
        throw new Error("Invalid file path");
      }

      const normalizedPath = path.normalize(relativePath.replace(/\\/g, "/"));

      if (normalizedPath.startsWith("..") || path.isAbsolute(normalizedPath)) {
        throw new Error("Invalid file path");
      }

      const destination = path.resolve(stagingPath, normalizedPath);

      if (!destination.startsWith(path.resolve(stagingPath) + path.sep)) {
        throw new Error("Invalid file path");
      }

      await fs.mkdir(path.dirname(destination), {
        recursive: true,
      });

      await fs.rename(file.path, destination);
    }

    /*
     * A valid VR project needs an entry file.
     */
    const entryFile = project.entryFile || "index.html";

    const stagedEntryFile = path.resolve(stagingPath, entryFile);

    if (!fsSync.existsSync(stagedEntryFile)) {
      return res.status(400).json({
        message: `Entry file "${entryFile}" was not found in the uploaded project`,
      });
    }

    /*
     * Prepare the replacement.
     */
    const currentProjectPath = getProjectStoragePath(slug);
    const backupPath = `${currentProjectPath}.backup-${Date.now()}`;

    /*
     * Move current project out of the way.
     */
    if (fsSync.existsSync(currentProjectPath)) {
      await fs.rename(currentProjectPath, backupPath);
    }

    try {
      /*
       * Move the fully prepared staging directory
       * into the live project location.
       */
      await fs.rename(stagingPath, currentProjectPath);

      stagingPath = null;

      /*
       * New project is live.
       * Remove the old version.
       */
      await fs.rm(backupPath, {
        recursive: true,
        force: true,
      });
    } catch (replacementError) {
      /*
       * If activation fails, restore the old project.
       */
      await fs
        .rm(currentProjectPath, {
          recursive: true,
          force: true,
        })
        .catch(() => {});

      if (fsSync.existsSync(backupPath)) {
        await fs.rename(backupPath, currentProjectPath);
      }

      throw replacementError;
    }

    return res.json({
      message: "Project files replaced successfully",
      slug,
      fileCount: files.length,
      projectPath: project.projectPath,
      entryFile,
    });
  } catch (error) {
    console.error("Failed to replace project files:", error);

    if (stagingPath) {
      await removeProjectStagingDirectory(stagingPath).catch(() => {});
    }

    return res.status(500).json({
      message: "Failed to replace project files",
    });
  }
}
