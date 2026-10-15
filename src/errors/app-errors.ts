export class AppError extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}
export const badRequest = (m: string) => new AppError(400, m);
export const unprocessable = (m: string) => new AppError(422, m);
export const notFound = (m: string) => new AppError(404, m);
export const conflict = (m: string) => new AppError(409, m);