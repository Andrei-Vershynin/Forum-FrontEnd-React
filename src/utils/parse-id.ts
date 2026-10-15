import { badRequest } from "../errors/app-errors.ts";

export const parseId = (raw: unknown, field = "id"): number => {
  const n = Number(raw);
  if (!Number.isInteger(n) || n <= 0) throw badRequest(`Invalid ${field}`);
  return n;
};