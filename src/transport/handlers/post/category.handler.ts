import type { NextFunction, Request, Response } from "express";
import type { CategoryService } from "../../../services/category.service";
import { parseId } from "../../../utils/parse-id.ts";

export const createCategoryHandlers = (service: CategoryService) => ({
  getAll: async (_req: Request, res: Response, next: NextFunction) => {
    try { res.json(await service.getAll()); } catch (e) { next(e); }
  },
  getById: async (req: Request, res: Response, next: NextFunction) => {
    try { res.json(await service.getById(parseId(req.params.id))); } catch (e) { next(e); }
  },
  create: async (req: Request, res: Response, next: NextFunction) => {
    try { res.status(201).json(await service.create(req.body)); } catch (e) { next(e); }
  },
});
export type CategoryHandlers = ReturnType<typeof createCategoryHandlers>;