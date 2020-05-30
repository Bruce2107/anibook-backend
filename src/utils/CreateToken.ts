import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { User } from '../constants/Token';

dotenv.config();

const token = process.env.TOKEN || 'anibook';

const createToken = (user: User) => {
  return jwt.sign({ nickname: user.nickname, email: user.email }, token);
};

export default createToken;
