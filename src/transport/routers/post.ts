// @ts-nocheck
import { Router } from 'express';
import { createPostHandlers } from '../handlers/post/post';
import { PostHandlers } from '../handlers/post/post';

const router = Router();

const { getPostsHandler, getPostByIdHandler, createPostHandler } = createPostHandlers('service' as any);

router.get('/posts', getPostsHandler);
router.get('/posts/:id', getPostByIdHandler);
router.post('/posts', createPostHandler);

function createPostrouter(handlers: PostHandlers) {
  const router = Router();

  router.get('/posts', handlers.getPostsHandler);
  router.get('/posts/:id', handlers.getPostByIdHandler);
  router.post('/posts', handlers.createPostHandler);

  return router;
}

export default router;