import { cpf, cnpj } from "cpf-cnpj-validator";
import z from 'zod'
import bcrypt from 'bcrypt'
export function isValidCpfOrCnpj(document: string): boolean {
  if (!document) return false;

  // Remover qualquer caractere não numérico (caso existam)
  const cleanDocument = document.replace(/[^\d]+/g, "");

  // Validar usando a biblioteca
  return cpf.isValid(cleanDocument) || cnpj.isValid(cleanDocument);
}

enum AccountType {
  Personal = 'PersonalAccount',
  Business = 'BusinessAccount'
}
export const verifyType = (document: string): AccountType => {
  const cleanDocument = document.replace(/[^\d]+/g, "");

  if (cleanDocument.length === 11) {
    console.log('ola');
    
    return AccountType.Personal;
  } 
  return AccountType.Business;
  
};


export const validadeSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  cpfOrCnpj: z.string().min(11).max(14),
  name: z.string(),
  type: z.string().optional(),
}).refine((data) => {
  const type = verifyType(data.cpfOrCnpj);
  return type !== null;
}, {
  message: 'Invalid CPF or CNPJ',
  path: ['cpfOrCnpj'],
}).transform((data) => {
  return {
    ...data,
    type: verifyType(data.cpfOrCnpj),
  }
});

