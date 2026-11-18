import { Request, Response, NextFunction } from "express";

export function ErrorHandler( err: any, req: Request, res: Response, next: NextFunction) {
  console.error(`${err.name}: ${err.message}`);
  const status = err.status ?? 500;
  res.status(status).json({
    fehler: err.message,
  });
}
