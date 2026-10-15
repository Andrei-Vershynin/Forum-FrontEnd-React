import { Repository } from '../domain/post/repository';
import { Service } from './post.types';

export function createPostService(repository: Repository): Service {
  return {
    getPosts: (category, take) => repository.getAll(category, take),
    getPost: (id) => repository.getById(id),
    createPost: (data) => repository.addPost(data),
  };
}