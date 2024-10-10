// src/services/accountService.ts
import { PrismaClient } from "@prisma/client";
import { ServiceResponse } from "../../types/serviceResponse";
import { accoutSchema } from "../../types/accout";
const prisma = new PrismaClient();
// Serviço para desativar uma conta
export async function desactiveAccount(userId: number, accountId: number):Promise<ServiceResponse<accoutSchema>> {
  // Verifica se o usuário tem permissão para desativar a conta
  if (userId !== accountId) {
    return {
      type:'error',
      status:'UNAUTHORIZED',
      data:{
        message:'Usuario sem permisao para desativar conta'
      }
    };
  }

  try {
    // Atualiza o status da conta para `false` (desativada)
    const account = await prisma.conta.update({
      where: { id: accountId },
      data: { status: false },
    });

    return {
      type:'success',
      status:'SUCCESS',
      data: account
    };
  } catch (error) {
    throw new Error('Account not found or failed to deactivate');
  }
}
