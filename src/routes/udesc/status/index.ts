import { Router, Request, Response } from 'express';
import {
  createStatusController,
  deleteStatusController,
  getAllStatusController,
  getStatusController,
  updateStatusController,
} from '@usecase/udesc/status';

const routes = Router();

routes.get('/status/:id', (req: Request, res: Response) =>
  getStatusController.handle(req, res)
);

routes.get('/status', (req: Request, res: Response) =>
  getAllStatusController.handle(req, res)
);

routes.post('/status', (req: Request, res: Response) =>
  createStatusController.handle(req, res)
);

routes.patch('/status/:id', (req: Request, res: Response) =>
  updateStatusController.handle(req, res)
);

routes.delete('/status/:id', (req: Request, res: Response) =>
  deleteStatusController.handle(req, res)
);

export default routes;
