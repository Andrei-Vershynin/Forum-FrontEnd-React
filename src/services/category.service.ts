

import type { CategoryRepository } from "../domain/post/repository.ts";
import { conflict, notFound, unprocessable } from "../errors/app-errors.ts";

type CreateCategoryDto = { name?: unknown };

export const createCategoryService = (repo: CategoryRepository) => ({
  getAll: () => repo.findAll(),

  async getById(id: number) {
    const category = await repo.findById(id);
    if (!category) throw notFound("Category not found");
    return category;
  },

  async create(dto: CreateCategoryDto) {
    const name = typeof dto?.name === "string" ? dto.name.trim() : "";
    if (!name || name.length > 100) {
      throw unprocessable("Field 'name' must be a non-empty string up to 100 chars");
    }
    if (await repo.findByName(name)) throw conflict("Category already exists");
    try {
      return await repo.create(name);
    } catch (e: any) {
      if (e?.code === "P2002") throw conflict("Category already exists"); // гонка запитів
      throw e;
    }
  },
});
export type CategoryService = ReturnType<typeof createCategoryService>;