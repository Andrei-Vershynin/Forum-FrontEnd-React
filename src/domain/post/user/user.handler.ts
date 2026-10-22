import type { Request, Response, NextFunction } from "express";
import type { UserService } from "./user.service";

export const createUserHandler = (service: UserService) => ({
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await service.register(req.body);
      res.status(201).json(user);
    } catch (e) { next(e); }
  },
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { accessToken } = await service.login(req.body);
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 1000,
      });
      res.status(200).json({ message: "Logged in" });
    } catch (e) { next(e); }
  },
});