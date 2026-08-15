import express from "express";
import cors from "cors";

import projectRoutes from "./routes/project.routes";
import { serveVRProject } from "./controllers/vr.controller";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "AIR Innovation API is running",
  });
});

app.get("/projects/:slug", (req, res) => {
  // Express 5 allows this route to match both:
  // /projects/foo
  // /projects/foo/
  //
  // Only redirect when the trailing slash is actually missing.
  if (!req.path.endsWith("/")) {
    return res.redirect(301, `/projects/${req.params.slug}/`);
  }

  return serveVRProject(req, res);
});

app.get("/projects/:slug/*path", serveVRProject);

app.use("/api/auth", authRoutes);

app.use("/api/projects", projectRoutes);

export default app;
