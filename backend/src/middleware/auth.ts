import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface AuthPayload {
  sub: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return secret;
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const [scheme, token] = authorization.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({
        message: "Invalid authorization header",
      });
    }

    const payload = jwt.verify(token, getJwtSecret()) as AuthPayload;

    req.user = payload;

    next();
  } catch {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}
