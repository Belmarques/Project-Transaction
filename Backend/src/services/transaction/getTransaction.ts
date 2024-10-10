import { PrismaClient } from "@prisma/client";
import { ServiceResponse } from "../../types/serviceResponse";
import { TransactionSchema } from "../../types/transaction";

const prisma = new PrismaClient();

 export const getTransaction = async (id: number,  userId:number):Promise<ServiceResponse<TransactionSchema[]>> => {
  if (userId !== id) {
   return {
    type:'error',
    status:'UNAUTHORIZED',
    data:{
      message:'notAutorization to create Transaction for this Id'
    }
   }
  }
  const account = await prisma.conta.findUnique({
    where: {
      id: id
    },
    select: {
      status: true, id: true
    }
  })
  if(!account) {
    return {
      type:'error',
      status:'NOT_FOUND',
      data: {
        message:'Account notFound'
      }
    }
  }
  if(account.status === false) {
    return {
      type:'error',
      status:'UNAUTHORIZED',
      data: {
        message: 'Account Desactivate'
      }
    }}

    const data = await prisma.transaction.findMany({
      where:{
        accountId:id
      }
    })
    return {
 type:'success',
 status:'SUCCESS',
 data: data
    }
};