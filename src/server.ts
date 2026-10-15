// @ts-nocheck
import express from 'express';
import { ErrorRequestHandler } from 'express';
import { createPostService } from './services/post';
import { createPostHandlers, PostHandlers } from './transport/handlers/post/post.ts';
import { createPostRepository } from './repositories/post.prisma.repository';
import { db } from './prisma/db';

declare const process: { env: { PORT?: string } };

const repository = createPostRepository(db);
const postRepository = createPostRepository(db);
const postService = createPostService(postRepository);
const postHandlers = createPostHandlers(postService);
const postRouter = createPostRouter(postHandlers);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(postRouter);

const errorHandler: ErrorRequestHandler = (err: unknown, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err) {
    return res.status(400).json({ message: 'Invalid request' });
  }
  next();
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;

function createPostRouter(postHandlers: PostHandlers) {
  return express.Router();
}
