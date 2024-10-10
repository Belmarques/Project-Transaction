import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Tipagem personalizada para `req.user`
export interface CustomRequest extends Request {
  user?: { id: number } | JwtPayload; // Definir a estrutura correta esperada no seu token
}

// Middleware para validação do token
const validateToken = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization;
// console.log('token',token);

  // Verifica se o cabeçalho de autorização foi enviado
  if (!token) {
    res.status(401).json({ message: 'Token not found' });
    return;
  }

  // Extração do token no formato Bearer
  const tokenBearer = token.split(' ')[1];

  if (!tokenBearer) {
    res.status(401).json({ message: 'Invalid token format' });
    return;
  }

  try {
    // Verifica o token e armazena o resultado em `validToken`
    const validToken = jwt.verify(tokenBearer, process.env.JWT_SECRET as string) as JwtPayload;

    // Confirma se o token decodificado contém um `id` para identificar o usuário
    if (!validToken || typeof validToken !== "object" || !validToken.id) {
      res.status(401).json({ message: 'Invalid token payload' });
      return;
    }

    // Atribui o `id` do usuário ao `req.user` para uso posterior
    req.user = { id: validToken.id as number }; // Definir `id` claramente como `number`

    // Avança para o próximo middleware ou rota
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
    return;
  }
};

export default validateToken;
