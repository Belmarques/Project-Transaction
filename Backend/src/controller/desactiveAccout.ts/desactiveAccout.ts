// src/controllers/accountController.ts
import {  Response } from "express";
import { desactiveAccount } from "../../services/desactiveAccout/desactiveAccout";
import { CustomRequest } from "../../middleware/jwtVeifyToken";
import httpMapper from "../../utils/httpMapper";

// Controlador para desativar a conta
export async function deactivateAccountController(req: CustomRequest, res: Response): Promise<Response | void> {
  const { id } = req.params;
  const xablau = parseInt(id)


  // Verifica se `req.user` está definido e possui um `id`
  if (!req.user || typeof req.user !== "object" || !req.user.id) {
  return res.status(401).json({ message: 'Unauthorized' });
    
  }

  const userId = req.user.id;

  

  try {
    // Chama o serviço para desativar a conta
    const response = await desactiveAccount(userId, xablau);
   if(response.type === 'error') {
    return res.status(httpMapper(response.status)).json(response.data)
   }
   return res.status(httpMapper(response.status)).json(response.data)
  } catch (error) {
    res.status(403).json({ message: (error as Error).message });
  }
}
