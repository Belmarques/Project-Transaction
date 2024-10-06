import { Request, Response } from "express";
import { transaction } from "../../services/transaction/transaction";

export const transactionController = async (req: Request, res: Response) => {
  const data = req.body
  const response = await transaction(data);
  console.log(response);
  
  res.status(201).json(response);
}