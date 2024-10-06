import { Request, Response } from "express";
import { Login } from "../../services/login/login";

export async function LoginController(req: Request, res: Response) {
  const response = req.body;
  const data = await Login(response);
  return res.status(200).json(data);
}