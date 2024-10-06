import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Tipagem personalizada para `req.user`
interface CustomRequest extends Request {
  user?: string | JwtPayload;
}
const validateToken = (req: CustomRequest, res: Response, next: NextFunction):any => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const tokenBearer = token.split(' ')[1];

  const validToken = jwt.verify(tokenBearer, process.env.JWT_SECRET as string);

  if (validToken === 'Token must be a valid token') {
    const  data  =  validToken
    return res.status(200).json(data);
  }
  req.user = validToken as any;
  next();
};

export default validateToken;
