import dotenv from 'dotenv';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { mongoConnection } from '../database';
import { User } from '../constants/types/TokenType';

dotenv.config();

const token = process.env.TOKEN || 'anibook';

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: token,
};

async function getUser(nickname: string) {
  const connection = await mongoConnection('anibook');
  return await connection.collection<User>('users').findOne({ nickname });
}

export default new Strategy(options, async (paylaod: User, done) => {
  try {
    const user = await getUser(paylaod.nickname);
    if (user) return done(null, user);
    return done(null, false);
  } catch (error) {
    return done(null, false);
  }
});
