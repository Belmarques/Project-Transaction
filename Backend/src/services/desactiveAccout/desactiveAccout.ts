import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function desactiveAccout(id:number) {
  const accout = await prisma.conta.update({
  where: {id:id},
  data: {status:false}
  })
  if(!accout)
  {
    return ('Account not found');
  }
  return ('Account deleted');


}

export async function deleteAccout(id:number) {
  const accout = await prisma.conta.delete({
    where:{id}
  })
  if(!accout){
    return ('Account not found')
  }
  return accout
}