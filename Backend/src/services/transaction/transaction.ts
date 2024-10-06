import { PrismaClient } from "@prisma/client";
import { Transaction } from "../../types/transaction";
const prisma = new PrismaClient();

export const transaction =  async (transactions:Transaction, id:number) => {
  const cashback = transactions.value * 0.05;
  const data = await prisma.transaction.create({
    data: {
      date: transactions.date,
      value: transactions.value,
      cashback: cashback,
      accountId: transactions.accountId,
 
    }
  });
  return {
    data


  }

}