import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../constants/types/TokenType';

dotenv.config();

const token = process.env.TOKEN || 'anibook';

const createToken = (user: User) => {
  return jwt.sign({nickname: user.nickname, email: user.email}, token)
};

export default createToken;
