import { Request, Response } from "express";
import { transaction } from "../../services/transaction/transaction";
import { CustomRequest } from "../../middleware/jwtVeifyToken";

export const transactionController = async (req: CustomRequest, res: Response) => {
  const data = req.body
const {id} = req.params;
if (!req.user || typeof req.user !== "object" || !req.user.id) {
  res.status(401).json({ message: 'Unauthorized' });
  return;
}

const userId = req.user.id;


  const response = await transaction(data, parseInt(id), userId);
  if(response.mensage) {
    return res.status(400).json(response.mensage);
  }
  res.status(201).json(response.data);
}