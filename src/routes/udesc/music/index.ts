import { Router, Request, Response } from 'express';
import {
  createMusicController,
  deleteMusicController,
  getMusicController,
  updateMusicController,
} from '@usecase/udesc/music';

const routes = Router();

routes.get('/music/:id', (req: Request, res: Response) =>
  getMusicController.handle(req, res)
);

routes.post('/music', (req: Request, res: Response) =>
  createMusicController.handle(req, res)
);

routes.patch('/music/:id', (req: Request, res: Response) =>
  updateMusicController.handle(req, res)
);

routes.delete('/music/:id', (req: Request, res: Response) =>
  deleteMusicController.handle(req, res)
);

export default routes;
