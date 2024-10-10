import z from 'zod';

export interface Account {
  id: number;
  name: string;
  email: string;
  password: string;
  cpfOrCnpj:string;
  type: "personalAccount" | "BusinesAccount";
  
}

export interface accoutSchema {
  email: string;
  password: string;
  cpfOrCnpj: string;
  name: string;
  type: string;
  status: boolean;
  id: number;
}