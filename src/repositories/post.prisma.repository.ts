
import type { Repository } from '../domain/post/repository';
import type { Post } from '../domain/post/entity';

type DB = any;

export const createPostRepository = (db: DB): Repository => {
  const posts = db.orm.public.Post;

  const toPost = (row: any): Post => ({
    id: row.id,
    title: row.title,
    content: row.content,
    category: row.category,
  });

  const repository = {
    async getAll({ category, take }: { category?: Post['category']; take?: number }) {
      const query = category ? posts.where({ category }) : posts;
      const rows = await query
        .orderBy((p: any) => p.createdAt.desc())
        .limit(take ?? 20)
        .all();
      return rows.map(toPost);
    },

    async getById(id: Post['id']) {
      const row = await posts.first({ id });
      return row ? toPost(row) : null;
    },

    async addPost(input: Pick<Post, 'title' | 'content' | 'category'> & { author: string }) {
      const row = await posts.create({
        title: input.title,
        content: input.content,
        category: input.category,
        author: input.author,
      });
      return toPost(row);
    },
  };

  return repository as Repository;
};

export const createCategoryRepository = (db: any) => ({
  findAll: () => db.category.findMany({ orderBy: { id: "asc" } }),
  findById: (id: any) => db.category.findUnique({ where: { id } }),
  findByName: (name: string) => db.category.findUnique({ where: { name } }),
  create: (name: any) => db.category.create({ data: { name } }),
});