import { Request, Response } from "express";

import { createAccount } from "../../services/createAccout/createAccout";

export async function createAccountController(req: Request, res: Response) {
  const response = req.body;
  if(!response) {
    return res.status(400).json({message: 'Invalid request'})
  }
console.log(response);

  const data = await createAccount(response);
return res.status(201).json(data)
}