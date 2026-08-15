import type { Request, Response } from "express";
import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";
import slugify from "slugify";

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

    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return res.status(400).json({
        message: "Project files are required",
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

    const projectStoragePath = await ensureProjectStorage(slug);

    const files = req.files as Express.Multer.File[];

    const paths = Array.isArray(req.body.paths)
      ? req.body.paths
      : [req.body.paths];

    if (paths.length !== files.length) {
      return res.status(400).json({
        message: "Each uploaded file must have a corresponding path",
      });
    }

    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const relativePath = paths[index];

      if (!relativePath) {
        throw new Error("Missing file path");
      }

      const normalizedPath = String(relativePath)
        .replace(/\\/g, "/")
        .replace(/^\/+/, "");

      const destination = path.resolve(projectStoragePath, normalizedPath);

      const storageRoot = path.resolve(projectStoragePath);

      if (
        destination !== storageRoot &&
        !destination.startsWith(storageRoot + path.sep)
      ) {
        throw new Error("Invalid file path");
      }

      await fs.mkdir(path.dirname(destination), {
        recursive: true,
      });

      await fs.rename(file.path, destination);
    }

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
      },
    });

    return res.status(201).json(project);
  } catch (error) {
    console.error(error);

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
