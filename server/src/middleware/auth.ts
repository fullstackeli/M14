import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const header = req.headers.authorization;
  if (header) {
    console.log(header);
    const token = header.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET_KEY || '', (error, decoded) => {
      if (error) {
        return res.status(500);
      }

      req.user = decoded as JwtPayload;
      return next();
    });
  } else {
    res.status(401)
  }
};
