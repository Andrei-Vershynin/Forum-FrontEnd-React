import { Router } from "express";
import type { RequestHandler } from "express";

type UserHandler = {
  register: RequestHandler;
  login: RequestHandler;
};

export function createUserRouter(handler: UserHandler) {
  const router = Router();
  router.post("/register", handler.register);
  router.post("/login", handler.login);
  return router;
}