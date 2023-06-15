import { Router, Request, Response } from 'express';
import {
  createStatusController,
  createStatusGraphController,
  deleteStatusController,
  deleteStatusGraphController,
  getAllStatusController,
  getAllStatusGraphController,
  getStatusController,
  getStatusGraphController,
  updateStatusController,
  updateStatusGraphController,
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

routes.get('/graph/status/:id', (req: Request, res: Response) =>
  getStatusGraphController.handle(req, res)
);

routes.get('/graph/status', (req: Request, res: Response) =>
  getAllStatusGraphController.handle(req, res)
);

routes.post('/graph/status', (req: Request, res: Response) =>
  createStatusGraphController.handle(req, res)
);

routes.patch('/graph/status/:id', (req: Request, res: Response) =>
  updateStatusGraphController.handle(req, res)
);

routes.delete('/graph/status/:id', (req: Request, res: Response) =>
  deleteStatusGraphController.handle(req, res)
);

export default routes;
