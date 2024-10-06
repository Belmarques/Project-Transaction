import { Request, Response } from "express";
import {deleteAccout, desactiveAccout} from "../../services/desactiveAccout/desactiveAccout";

export async function desactiveAccoutController(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  if(isNaN(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  const data = await desactiveAccout(id);
  return res.status(200).json(data);
}

export async function deleteAccoutController(req:Request, res:Response) {
  const id = parseInt( req.params.id)
 if(isNaN(id)) {
  await deleteAccout(id)
    return res.status(200)
 }
}