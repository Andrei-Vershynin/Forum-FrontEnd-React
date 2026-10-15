import { Router } from "express";
import type { CategoryHandlers } from "../handlers/post/category.handler";

export const createCategoryRouter = (h: CategoryHandlers) => {
  const router = Router();
  router.get("/", h.getAll);
  router.get("/:id", h.getById);
  router.post("/", h.create);
  return router;
};