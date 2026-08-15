import type { Request, Response } from "express";
import fs from "node:fs";
import path from "node:path";

import { prisma } from "../config/database";
import { getProjectStoragePath } from "../utils/storage";

export async function serveVRProject(req: Request, res: Response) {
  try {
    const { slug } = req.params;

    const project = await prisma.project.findUnique({
      where: {
        slug,
      },
    });

    if (!project) {
      return res.status(404).send("Project not found");
    }

    const projectStoragePath = getProjectStoragePath(slug);
    const projectRoot = path.resolve(projectStoragePath);

    /*
     * Express 5 wildcard route:
     *
     * /projects/:slug/*path
     *
     * gives us req.params.path.
     *
     * For:
     *
     * /projects/air-vr-test
     *
     * there is no path, so we serve the project's entry file.
     *
     * For:
     *
     * /projects/air-vr-test/lib/test.js
     *
     * we serve:
     *
     * lib/test.js
     */

    let requestedPath = project.entryFile || "index.html";

    const routePath = req.params.path;

    if (routePath) {
      if (Array.isArray(routePath)) {
        requestedPath = routePath.join("/");
      } else {
        requestedPath = routePath;
      }
    }

    /*
     * Normalize the requested path.
     */

    const normalizedPath = path.normalize(decodeURIComponent(requestedPath));

    /*
     * Prevent path traversal attacks.
     *
     * Reject things such as:
     *
     * ../../etc/passwd
     * ../secrets
     */

    if (normalizedPath.startsWith("..") || path.isAbsolute(normalizedPath)) {
      return res.status(400).send("Invalid project path");
    }

    const requestedFile = path.resolve(projectRoot, normalizedPath);

    /*
     * Make absolutely sure the resolved file stays
     * inside this project's directory.
     */

    if (
      requestedFile !== projectRoot &&
      !requestedFile.startsWith(projectRoot + path.sep)
    ) {
      return res.status(400).send("Invalid project path");
    }

    /*
     * Check that the requested file exists.
     */

    if (!fs.existsSync(requestedFile)) {
      return res.status(404).send("Project file not found");
    }

    const stats = fs.statSync(requestedFile);

    if (!stats.isFile()) {
      return res.status(404).send("Project file not found");
    }

    return res.sendFile(requestedFile);
  } catch (error) {
    console.error("Failed to serve VR project:", error);

    return res.status(500).send("Failed to load VR project");
  }
}
