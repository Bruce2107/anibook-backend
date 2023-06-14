import { Router, Request, Response } from 'express';
import {
  createMusicController,
  createMusicGraphController,
  deleteMusicController,
  deleteMusicGraphController,
  getAllMusicsController,
  getAllMusicsGraphController,
  getMusicController,
  getMusicGraphController,
  updateMusicController,
  updateMusicGraphController,
} from '@usecase/udesc/music';

const routes = Router();

routes.get('/music/:id', (req: Request, res: Response) =>
  getMusicController.handle(req, res)
);

routes.get('/musics', (req: Request, res: Response) =>
  getAllMusicsController.handle(req, res)
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

routes.get('/graph/music/:id', (req: Request, res: Response) =>
  getMusicGraphController.handle(req, res)
);

routes.get('/graph/musics', (req: Request, res: Response) =>
  getAllMusicsGraphController.handle(req, res)
);

routes.post('/graph/music', (req: Request, res: Response) =>
  createMusicGraphController.handle(req, res)
);

routes.patch('/graph/music/:id', (req: Request, res: Response) =>
  updateMusicGraphController.handle(req, res)
);

routes.delete('/graph/music/:id', (req: Request, res: Response) =>
  deleteMusicGraphController.handle(req, res)
);

export default routes;
