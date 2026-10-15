import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app-errors";

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) return res.status(err.status).json({ error: err.message });
  if (err?.type === "entity.parse.failed") return res.status(400).json({ error: "Invalid JSON" });
  if (err?.code === "P2002") return res.status(409).json({ error: "Already exists" });
  if (err?.code === "P2025" || err?.code === "P2003") return res.status(404).json({ error: "Not found" });
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
};