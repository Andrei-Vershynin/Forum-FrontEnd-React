import type { CreatePostInput, Post } from './entity';
import type { Category } from "./entity";

export interface Repository {
  getAll(category?: string, take?: number): Promise<Post[]>;
  getById(id: number): Promise<Post | undefined>;
  addPost(data: CreatePostInput): Promise<Post>;
}

export interface CategoryRepository {
  findAll(): Promise<Category[]>;
  findById(id: number): Promise<Category | null>;
  findByName(name: string): Promise<Category | null>;
  create(name: string): Promise<Category>;
}

export type PostFilter = { categoryName?: string; categoryId?: number };

export interface PostRepository {
  findAll(filter?: PostFilter): Promise<Post[]>;
  findById(id: number): Promise<Post | null>;
  create(data: { title: string; content: string; categoryId: number }): Promise<Post>;
}