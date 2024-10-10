import { Request, Response } from "express";
import { Login } from "../../services/login/login";
import httpMapper from "../../utils/httpMapper";

export async function LoginController(req: Request, res: Response):Promise<Response> {
  console.log('req.body',req.body);
  
  const {cpfOrCnpj, password} = req.body;
  const response = await Login({cpfOrCnpj, password});
  if(response.type === 'error') {
    return res.status(httpMapper(response.status)).json(response.data);
  }
  console.log(response.data);
  


  return res.status(httpMapper(response.status)).json(response.data);
}