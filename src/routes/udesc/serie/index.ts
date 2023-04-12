import { Router, Request, Response } from 'express';
import {
  createSerieController,
  deleteSerieController,
  getSerieController,
  updateSerieController,
} from '@usecase/udesc/serie';

const routes = Router();

routes.get('/serie/:id', (req: Request, res: Response) =>
  getSerieController.handle(req, res)
);

routes.post('/serie', (req: Request, res: Response) =>
  createSerieController.handle(req, res)
);

routes.patch('/serie/:id', (req: Request, res: Response) =>
  updateSerieController.handle(req, res)
);

routes.delete('/serie/:id', (req: Request, res: Response) =>
  deleteSerieController.handle(req, res)
);

export default routes;
