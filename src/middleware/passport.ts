import dotenv from 'dotenv';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { User } from 'anibook';
import { get } from '../database/token';

dotenv.config();

const token = process.env.TOKEN || 'anibook';

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: token,
};

export default new Strategy(options, async (paylaod: User, done) => {
  try {
    const user = await get(paylaod.nickname);
    if (user) return done(null, user);
    return done(null, false);
  } catch (error) {
    return done(null, false);
  }
});
