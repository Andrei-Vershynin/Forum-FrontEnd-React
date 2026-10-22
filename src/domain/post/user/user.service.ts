import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { UserRepository } from "./user.repository";
import type { RegisterUserDto, LoginUserDto } from "./user.dto";

export class HttpError extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const createUserService = (repo: UserRepository) => ({
  async register({ email, password }: RegisterUserDto) {
    if (typeof email !== "string" || typeof password !== "string" || !email || password.length < 6) {
      throw new HttpError(400, "Email and password (min 6 chars) are required");
    }
    const existing = await repo.findByEmail(email);
    if (existing) {
      throw new HttpError(409, "Email already exists");
    }
    const hash = await bcrypt.hash(password, 10);
    return repo.create({ email, password: hash });
  },

  async login({ email, password }: LoginUserDto) {
    const user = typeof email === "string" ? await repo.findByEmail(email) : null;
    const ok = user && typeof password === "string" && (await bcrypt.compare(password, user.password));
    if (!user || !ok) {
      throw new HttpError(401, "Invalid email or password");
    }
    const accessToken = jwt.sign(
      { sub: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
    );
    return { accessToken };
  },
});

export type UserService = ReturnType<typeof createUserService>;