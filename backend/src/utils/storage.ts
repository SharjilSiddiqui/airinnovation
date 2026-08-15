import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const storageRoot = path.resolve(
  process.env.STORAGE_ROOT || "./storage/vr-projects",
);

const stagingRoot = path.join(os.tmpdir(), "air-innovation-staging");

export function getProjectStoragePath(slug: string) {
  return path.join(storageRoot, slug);
}

export async function ensureStorageRoot() {
  await fs.mkdir(storageRoot, { recursive: true });
}

export async function ensureProjectStorage(slug: string) {
  const projectPath = getProjectStoragePath(slug);

  await fs.mkdir(projectPath, {
    recursive: true,
  });

  return projectPath;
}

export async function removeProjectStorage(slug: string) {
  const projectPath = getProjectStoragePath(slug);

  await fs.rm(projectPath, {
    recursive: true,
    force: true,
  });
}

export async function createProjectStagingDirectory(slug: string) {
  await fs.mkdir(stagingRoot, {
    recursive: true,
  });

  const stagingPath = await fs.mkdtemp(path.join(stagingRoot, `${slug}-`));

  return stagingPath;
}

export async function removeProjectStagingDirectory(stagingPath: string) {
  await fs.rm(stagingPath, {
    recursive: true,
    force: true,
  });
}
