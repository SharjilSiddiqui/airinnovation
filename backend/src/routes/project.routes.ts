import { Router } from "express";

import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  replaceProjectFiles,
  updateProject,
} from "../controllers/project.controller";

import { upload } from "../middleware/upload";

const router = Router();

router.get("/", getProjects);

router.get("/:slug", getProject);

router.post("/", upload.array("files", 5000), createProject);

router.delete("/:slug", deleteProject);

router.put("/:slug/files", upload.array("files", 5000), replaceProjectFiles);

router.put("/:slug", updateProject);

export default router;
