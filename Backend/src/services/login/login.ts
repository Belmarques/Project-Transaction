import { PrismaClient } from "@prisma/client";
import { Login } from "../../types/login";
import { generateToken } from "../../utils/jtwUttils";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function Login(data:Login) {
const {cpf, cnpj, password} = data;
if ((!cpf && !cnpj || cpf && cnpj))
{
  return ('informe apenas um dos campos, cpf ou cnpj');
}
const accout = await prisma.conta.findFirst({
  where: {
    OR: [{cpf:cpf },
      {cnpj:cnpj}
    ]
  }
})
if(!accout) {
  return('Login INvalido')

}
const comparePassword =  bcrypt.compare(password, accout.password);
if(!comparePassword) {
  return('Login INvalido')
}

const token = generateToken(accout);
return `LOGIN SUCEDIDO: ${token}`
 }
