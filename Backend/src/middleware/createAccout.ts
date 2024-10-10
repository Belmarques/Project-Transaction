import { Request, Response, NextFunction } from "express";

export function createAccountMiddleware(req: Request, res: Response, next: NextFunction):Response | void {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing required information" });
  }
  next();
}
const validname = (req:Request, res:Response, next:NextFunction):Response | void => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (typeof name !== 'string') {
    return res.status(422).json({ message: '"name" must be a string' });
  }
  if (name.length < 3) {
    return res.status(422).json({ message: '"name" length must be at least 3 characters long' });
  }
  next();
};
