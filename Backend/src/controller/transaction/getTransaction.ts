// src/controllers/transactionController.ts
import { Request, Response } from "express";
import { getTransaction } from "../../services/transaction/getTransaction";
import { CustomRequest } from "../../middleware/jwtVeifyToken";
import httpMapper from "../../utils/httpMapper";

export const getTransactionController = async (req: CustomRequest, res: Response):Promise<Response |void > => {
  const { id } = req.params; // Obtém o ID da conta a partir dos parâmetros da URL

  // Verifica se `req.user` está definido e possui um `id`
  if (!req.user || typeof req.user !== "object" || !req.user.id) {
    return res.status(400).json('chave de acesso negada')
  }

  const userId = req.user.id;

  const response= await getTransaction(parseInt(id),userId)
 if(response.type === 'error') {
  return res.status(httpMapper(response.status)).json(response.data)
 }
 return res.status(httpMapper(response.status)).json(response.data)
};
