import { PrismaClient } from "@prisma/client";
import { Account } from "../../types/accout";
import { isValidCpfOrCnpj } from "../../utils/validationsCpf";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function createAccount(data:Account) {
  
  if((!data.cnpj && !data.cpf || data.cpf, data.cnpj))
    {
      return ( 'um dos campos devem estar preenchidos');
    }
    const document = data.cpf || data.cnpj;
    if(!isValidCpfOrCnpj(document))
    {
      return ('Cpf Or Cnpj Invalid');
    }
    const existingAccount = await prisma.conta.findFirst({
      where: {
        OR: [{
          cpf: data.cpf
        },
      {cnpj: data.cnpj}]

      }
    })
    if(existingAccount)
    {
      return ('Account already exists');
    }
  const accout = await prisma.conta.create({
    data: {
      name: data.name,
      email: data.email,
      password: await bcrypt.hash(data.password, 10),
      cpf: data.cpf,
      cnpj:data.cnpj,
    status: true,    }
  })
  
return accout;    } 
  
