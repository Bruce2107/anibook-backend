import { Router, Request, Response } from 'express';
import {
  createStudioController,
  deleteStudioController,
  getStudioController,
  updateStudioController,
} from '@usecase/udesc/studio';

const routes = Router();

routes.get('/studio/:id', (req: Request, res: Response) =>
  getStudioController.handle(req, res)
);

routes.post('/studio', (req: Request, res: Response) =>
  createStudioController.handle(req, res)
);

routes.patch('/studio/:id', (req: Request, res: Response) =>
  updateStudioController.handle(req, res)
);

routes.delete('/studio/:id', (req: Request, res: Response) =>
  deleteStudioController.handle(req, res)
);

export default routes;
