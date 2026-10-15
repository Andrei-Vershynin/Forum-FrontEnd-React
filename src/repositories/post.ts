import type { Post } from '../domain/post/entity';
import type { Repository } from '../domain/post/repository';

export function createPostRepository(): Repository {
  const posts: Post[] = [
    { id: 1, title: 'book Node.js', content: 'Node.js basics for beginners who want to build backend APIs.', category: 'programming' },
    { id: 2, title: 'book TypeScript', content: 'Why TypeScript matters and how it improves JavaScript projects.', category: 'programming' },
    { id: 3, title: 'book Breakfast Ideas', content: 'A few simple ideas to start your morning right.', category: 'lifestyle' },
    { id: 4, title: 'book Travel Destinations', content: 'Best places to visit in 2026 for every type of traveler.', category: 'travel' },
    { id: 5, title: 'book JavaScript', content: 'A deep dive into closures and why they matter.', category: 'programming' },
  ];

  let nextId = posts.length + 1;

  return {
    async getAll(category, take) {
      let result = posts;

      if (category) {
        result = result.filter((post) => post.category === (category as string));
      }

      if (take !== undefined) {
        result = result.slice(0, take);
      }

      return result;
    },

    async getById(id) {
      return posts.find((post) => post.id === id);
    },

    async addPost({ title, content, category }) {
      const newPost: Post = {
        id: nextId++,
        title,
        content,
        category: category || 'general',
      };

      posts.push(newPost);
      return newPost;
    },
  };
}

