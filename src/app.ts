import express from 'express';
import cors from 'cors';
import passport from 'passport';
import dotenv from 'dotenv';
import passportMiddleware from './middleware/passport';
import animeRoutes from './routes/anime';
import imageRoutes from './routes/image';
import mangaRoutes from './routes/manga';
import tokenRoutes from './routes/token';
import mixedRoutes from './routes/mixed';
import defaultRoute from './routes/default';

class App {
  public express: express.Application;
  public constructor() {
    this.express = express();
    this.env();
    this.middleWares();
    this.routes();
  }
  private middleWares() {
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(passport.initialize());
    passport.use(passportMiddleware);
  }
  private env() {
    dotenv.config({
      path:
        process.env.NODE_ENV === 'qa' || process.env.NODE_ENV === 'test'
          ? '.env.qa'
          : '.env',
    });
  }
  private routes() {
    this.express.use(animeRoutes);
    this.express.use(imageRoutes);
    this.express.use(mangaRoutes);
    this.express.use(tokenRoutes);
    this.express.use(mixedRoutes);
    this.express.use(defaultRoute);
  }
}

export default new App().express;
