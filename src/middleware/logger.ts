import { Request, Response, NextFunction } from "express";

export function logger(req: Request, res: Response, next: NextFunction) {
    const date = Date.now();
    res.on("finish", () => {
        const duration = Date.now() - date;
        console.log(`${req.method} ${req.url} → ${res.statusCode} (${duration} ms)`);
    });
  next();
}