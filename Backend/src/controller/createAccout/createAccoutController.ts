import { Request, Response } from "express";

import { createAccount } from "../../services/createAccout/createAccout";
import httpMapper from "../../utils/httpMapper";

export async function createAccountController(req: Request, res: Response):Promise<Response> {
const data = req.body;
const response = await createAccount(data);
if(response.type === 'error') {
  return res.status(httpMapper(response.status)).json(response.data);
}
return res.status(httpMapper(response.status)).json(response.data);

}