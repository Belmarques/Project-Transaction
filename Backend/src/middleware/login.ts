import { Request, Response, NextFunction } from "express";


export const verifyLogin = (req:Request, res:Response, next:NextFunction): Response | void => {
  const { cpfOrCnpj, password } = req.body;
  if (!cpfOrCnpj || !password) {
    return res.status(400).json({ message: '"username" and "password" are required' });
  }
  next();
};
