import { cpf, cnpj } from "cpf-cnpj-validator";
import validator from "cpf-cnpj-validator";
const num = cpf.generate();
cpf.isValid(num);

const Joi = require('@hapi/joi').extend(validator)

const cpfSchema = Joi.document().cpf()

export function isValidCpfOrCnpj(document:string): boolean {
return cpf.isValid(document) || cnpj.isValid(document)}

