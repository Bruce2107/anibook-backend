import dotenv from 'dotenv';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { User } from 'anibook';
import TokenAdapter from '@adapter/token/repository/DatabaseToken';

dotenv.config({
  path: process.env.NODE_ENV === 'qa' ? '.env.qa' : '.env',
});

const token = process.env.TOKEN || 'anibook';
const tokenAdapter = new TokenAdapter();
const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: token,
};

export default new Strategy(options, async (paylaod: User, done) => {
  try {
    const user = await tokenAdapter.getOne(paylaod.nickname);
    if (user) return done(null, user);
    return done(null, false);
  } catch (error) {
    return done(null, false);
  }
});
