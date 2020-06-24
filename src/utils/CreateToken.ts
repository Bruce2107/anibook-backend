import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { User } from 'anibook';

dotenv.config({
  path: process.env.NODE_ENV === 'qa' ? '.env.qa' : '.env',
});
const token = process.env.TOKEN || 'anibook';

const createToken = (user: User) => {
  return jwt.sign({ nickname: user.nickname, email: user.email }, token);
};

export default createToken;
