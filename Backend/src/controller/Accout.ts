import { Request, Response } from "express";

import { getAccouts, getActiveAccout } from "../services/Account";

export async function getAccoutsController(req: Request, res: Response) {
  const data = await getAccouts();
  return res.status(200).json(data);
}
export async function getActiveAccoutsController(req: Request, res: Response) {
  const data = await getActiveAccout();
  return res.status(200).json(data);
}