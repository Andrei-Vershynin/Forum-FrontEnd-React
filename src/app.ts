import express from "express";
import cookieParser from "cookie-parser";
import { createPostService } from "./post.service";
import { createCategoryRepository, createPostRepository } from "./repositories/post.prisma.repository";
import { createCategoryService } from "./services/category.service";
import { createCategoryHandlers } from "./transport/handlers/post/category.handler";
import { createPostHandlers } from "./transport/handlers/post/post";
import { errorHandler } from "./middlewares/error-handler";
import { createCategoryRouter } from "./transport/routers/category.router";
import { createPostRouter } from "./transport/routers/post";
import { createUserRepository } from "./domain/post/user/user.repository";
import { createUserService } from "./domain/post/user/user.service";
import { createUserHandler } from "./domain/post/user/user.handler";
import { createUserRouter } from "./domain/post/user/user.router";
import app from "./server";
import { db } from "./prisma/db";

const categoryRepository = createCategoryRepository(db);
const postRepository = createPostRepository(db);
const userRepository = createUserRepository(db);

const categoryService = createCategoryService(categoryRepository);
const postService = createPostService(
    postRepository as unknown as Parameters<typeof createPostService>[0],
    categoryRepository,
);
const userService = createUserService(userRepository);

const categoryHandlers = createCategoryHandlers(categoryService);
const postHandlers = createPostHandlers({
    getPosts: (filter) => postService.getAll(
        filter as Parameters<typeof postService.getAll>[0] ?? {} as Parameters<typeof postService.getAll>[0],
    ),
    getPost: (id) => postService.getById(id),
    createPost: (dto) => postService.create(dto),
});
const userHandler = createUserHandler(userService);

app.use(express.json());
app.use(cookieParser());
app.use("/posts", createPostRouter(postHandlers));
app.use("/categories", createCategoryRouter(categoryHandlers));
app.use("/auth", createUserRouter(userHandler));
app.use(errorHandler);