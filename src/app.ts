import express from 'express';
import cors from 'cors';
import passport from 'passport';
import passportMiddleware from './middleware/passport';
import animeRoutes from './routes/anime';
import imageRoutes from './routes/image';
import mangaRoutes from './routes/manga';
import tokenRoutes from './routes/token';
import defaultRoutes from './routes/defualt';

class App {
  public express: express.Application;
  public constructor() {
    this.express = express();
    this.middlawares();
    this.routes();
  }
  private middlawares() {
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(passport.initialize());
    passport.use(passportMiddleware)
  }
  private routes() {
    this.express.use(animeRoutes);
    this.express.use(imageRoutes);
    this.express.use(mangaRoutes);
    this.express.use(tokenRoutes);
    this.express.use(defaultRoutes);
  }
}

export default new App().express;
