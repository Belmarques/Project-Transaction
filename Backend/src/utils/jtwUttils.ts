import jwt from 'jsonwebtoken';
export function generateToken(payload:any):string {
  const {id, cpf, cnpj} = payload;
  // console.log(payload);
  
  const secret = process.env.JWT_SECRET || 'secret';
  return jwt.sign({id, cpf, cnpj}, secret, {expiresIn: '1h'});
}

