import multer from "multer";
import os from "node:os";
import fs from "node:fs";
import path from "node:path";

const tempDirectory = path.join(os.tmpdir(), "air-innovation-uploads");

fs.mkdirSync(tempDirectory, {
  recursive: true,
});

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, tempDirectory);
  },

  filename: (_req, file, cb) => {
    const uniquePrefix = `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    const safeName = path.basename(file.originalname);

    cb(null, `${uniquePrefix}-${safeName}`);
  },
});

export const upload = multer({
  storage,

  limits: {
    fileSize: 100 * 1024 * 1024,
    files: 5000,
  },
});
