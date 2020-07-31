import jwt from 'jsonwebtoken';
import { User } from 'anibook';

const token = process.env.TOKEN || 'anibook';

export const createToken = (user: User) => {
  return jwt.sign({ nickname: user.nickname, email: user.email }, token);
};
