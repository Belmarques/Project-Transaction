import { PrismaClient } from "@prisma/client";
import { Transaction, TransactionSchema } from "../../types/transaction";
import { ServiceResponse } from "../../types/serviceResponse";
import { accoutSchema } from "../../types/accout";
const prisma = new PrismaClient();
interface TransactionResponse {
  mensage?: string;
  data?: object;
}

export const transaction =  async (transactions:Transaction, id:number, userId:number):Promise<ServiceResponse<TransactionSchema>> => {
  const cashback = transactions.value * 0.05;
  if (userId !== id) {
    throw new Error('You do not have permission to deactivate this account');
  }
const account = await prisma.conta.findUnique({
  where: {
    id: transactions.accountId
  },
  select: {
    status: true, id: true
  }
})
if(!account) {
  return {type:'error',
    status:'NOT_FOUND',
    data:{
      message:'Account notFound'
    }
  }
}
if(account.status === false) {
  return {
    type:'error',
    status:'UNAUTHORIZED',
    data:{
      message:'Account desactivated'
    }
  }}

  const data = await prisma.transaction.create({
    data: {
      date: transactions.date,
      value: transactions.value,
      cashback: cashback,
      accountId: transactions.accountId,
 
    }
  });
  return {
     type:'success',
     status: 'CREATED',
     data:data
  }

}