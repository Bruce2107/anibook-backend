import express from 'express';
import cors from 'cors';
import animeRoutes from './routes/anime';
import imageRoutes from './routes/image';

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
  }
  private routes() {
    this.express.use(animeRoutes);
    this.express.use(imageRoutes);
  }
}

export default new App().express;
