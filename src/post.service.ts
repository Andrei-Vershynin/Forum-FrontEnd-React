import type { CategoryRepository, PostFilter, PostRepository } from "./domain/post/repository";
import { badRequest, notFound, unprocessable } from "./errors/app-errors";


export const createPostService = (posts: PostRepository, categories: CategoryRepository) => ({
  async getAll(filter: PostFilter) {
    return posts.findAll(filter);
  },

  async getById(id: number) {
    const post = await posts.findById(id);
    if (!post) throw notFound("Post not found");
    return post;
  },

  async create(dto: any) {
    const title = typeof dto?.title === "string" ? dto.title.trim() : "";
    const content = typeof dto?.content === "string" ? dto.content.trim() : "";
    if (!title || !content) {
      throw unprocessable("Fields 'title' and 'content' must be non-empty strings");
    }
    if (!Number.isInteger(dto?.categoryId) || dto.categoryId <= 0) {
      throw badRequest("Invalid categoryId");
    }
    if (!(await categories.findById(dto.categoryId))) throw notFound("Category not found");
    return posts.create({ title, content, categoryId: dto.categoryId });
  },
});