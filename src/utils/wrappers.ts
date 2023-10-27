import { Request, Response, NextFunction, RequestHandler } from "express";

export const asyncWrapper = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
