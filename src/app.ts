import express from "express";
import { createPostService } from "./post.service";
import { createCategoryRepository, createPostRepository } from "./repositories/post.prisma.repository";
import { createCategoryService } from "./services/category.service";
import { createCategoryHandlers } from "./transport/handlers/post/category.handler";
import { createPostHandlers, type PostHandlers } from "./transport/handlers/post/post";
import { errorHandler } from "./middlewares/error-handler";
import { createCategoryRouter } from "./transport/routers/category.router";
import app from "./server";
import { db } from "./prisma/db";

const categoryRepository = createCategoryRepository(db);
const postRepository = createPostRepository(db);

const categoryService = createCategoryService(categoryRepository);
const postService = createPostService(
    postRepository as unknown as Parameters<typeof createPostService>[0],
    categoryRepository,
);

const categoryHandlers = createCategoryHandlers(categoryService);
const postHandlers = createPostHandlers({
    getPosts: (filter) => postService.getAll(
        filter as Parameters<typeof postService.getAll>[0] ?? {} as Parameters<typeof postService.getAll>[0],
    ),
    getPost: (id) => postService.getById(id),
    createPost: (dto) => postService.create(dto),
});

app.use(express.json());
app.use("/posts", createPostRouter(postHandlers));
app.use("/categories", createCategoryRouter(categoryHandlers));
app.use(errorHandler);

function createPostRouter(_postHandlers: PostHandlers): import("express-serve-static-core").RequestHandler<{}, any, any, import("qs").ParsedQs, Record<string, any>> {
    throw new Error("Function not implemented.");
}

