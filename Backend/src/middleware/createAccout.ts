import { Request, Response, NextFunction } from "express";

export function createAccountMiddleware(req: Request, res: Response, next: NextFunction) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing required information" });
  }
  next();
}
