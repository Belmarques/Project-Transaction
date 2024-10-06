import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAccouts () {
  const accout = await prisma.conta.findMany();
  return accout;
}
export async function getActiveAccout () {
  const accout = await prisma.conta.findMany({
    where: {
      status: true
    }
  });
  return accout;
}