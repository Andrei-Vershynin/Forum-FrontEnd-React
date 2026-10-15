import { CreatePostInput, Post } from '../domain/post/entity';

export interface Service {
  getPosts(category?: string, take?: number): Promise<Post[]>;
  getPost(id: number): Promise<Post | undefined>;
  createPost(data: CreatePostInput): Promise<Post>;
}