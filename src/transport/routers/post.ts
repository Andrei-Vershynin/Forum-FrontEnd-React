import { Router } from "express";
import type { PostHandlers } from "../handlers/post/post";

export function createPostRouter(handlers: PostHandlers) {
  const router = Router();

  router.get("/", handlers.getPostsHandler);
  router.get("/:id", handlers.getPostByIdHandler);
  router.post("/", handlers.createPostHandler);

  return router;
}