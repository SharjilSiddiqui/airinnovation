import { Router } from "express";

import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  replaceProjectFiles,
  updateProject,
} from "../controllers/project.controller";

import { requireAuth } from "../middleware/auth";
import { upload } from "../middleware/upload";

const router = Router();

// Public
router.get("/", getProjects);

router.get("/:slug", getProject);

// Admin only
router.post("/", requireAuth, upload.array("files", 5000), createProject);

router.delete("/:slug", requireAuth, deleteProject);

router.put("/:slug", requireAuth, updateProject);

router.put(
  "/:slug/files",
  requireAuth,
  upload.array("files", 5000),
  replaceProjectFiles,
);

export default router;
