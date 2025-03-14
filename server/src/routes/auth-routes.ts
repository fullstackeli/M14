import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  const username = req.body.username;
  const password = req.body.password;
  const user = await User.findOne({ where: {username: username} });
  if (!user) {
    return res.status(401);
  }
  const passwordMatches = await bcrypt.compare(password, user.password);
  if (passwordMatches) {
    const jwtToken  = jwt.sign({ username }, process.env.JWT_SECRET_KEY || '', { expiresIn: '1h' });
    return res.json({token: jwtToken});
  } else {
    return res.status(401);
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
