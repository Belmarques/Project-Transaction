export interface Account {
  name: string;
  email: string;
  password: string;
cpfOrCnpj: string;
}
export interface login {
  cpfOrPassword: string;
  password: string;
}