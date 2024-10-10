import { PrismaClient } from "@prisma/client";
import { Account, accoutSchema } from "../../types/accout";
import { isValidCpfOrCnpj, validadeSchema } from "../../utils/validationsCpf";
import { ServiceResponse } from "../../types/serviceResponse";
import bcrypt from 'bcrypt';


const prisma = new PrismaClient();

export async function createAccount(data:Account):Promise<ServiceResponse<accoutSchema>> {
  
 const validateAccout = validadeSchema.parse(data)
    const document = data.cpfOrCnpj;
    if (!isValidCpfOrCnpj(document)) {
  return {
    type: 'error',
    status: 'NO_CONTENT',
    data: {
      message: 'Invalid CPF or CNPJ',
    },
  }
    }
    const existingAccount = await prisma.conta.findFirst({
 where: {
  AND: {
    cpfOrCnpj: data.cpfOrCnpj,
  }
 }
    })
    if(existingAccount)
    {
      return {
        type: 'error',
        status: 'CONFLICT',
        data: {
          message: 'Account already exists'
        }
    }
  }
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const accountData = {
    ...validateAccout,
    password: hashedPassword
  }
  const accout = await prisma.conta.create({
    data:accountData
  })
  
return {
  type: 'success',
  status: 'CREATED',
  data: accout,

    } 
  }
