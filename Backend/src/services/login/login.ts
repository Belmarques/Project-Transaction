import { PrismaClient } from "@prisma/client";
import { Login } from "../../types/login";
import { generateToken } from "../../utils/jtwUttils";
import bcrypt from 'bcrypt';
import { ServiceResponse } from "../../types/serviceResponse";

const prisma = new PrismaClient();
type TokenPayload = {
  token: string;
}
export async function Login(data:Login):Promise<ServiceResponse<TokenPayload>> {
const {cpfOrCnpj, password} = data;
if (!cpfOrCnpj && !password) {
  return {
    type: 'error',
    status: 'NO_CONTENT',
    data: {
      message: 'Invalid CPF or CNPJ',
    },
  };
}

const accout = await prisma.conta.findFirst({
  where: {
   AND: {
    cpfOrCnpj: cpfOrCnpj,
   }
  }
})
console.log('Servicess',accout);

if(!accout) {
  return {
   type: 'error',
    status: 'NOT_FOUND',
    data: {
      message: 'Account not found',
    },
  }

}
const comparePassword = await bcrypt.compare(password, accout.password);
if(!comparePassword) {
  return {
    type: 'error',
    status: 'UNAUTHORIZED',
    data: {
      message: 'Invalid password',
    },
  }
}
// console.log('service',comparePassword);


const token = generateToken(accout);
return {
  type: 'success',
  status: 'SUCCESS',
  data: {
    token,
  },
}
 }
