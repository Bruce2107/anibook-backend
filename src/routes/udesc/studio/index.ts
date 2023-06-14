import { Router, Request, Response } from 'express';
import {
  createStudioController,
  createStudioGraphController,
  deleteStudioController,
  deleteStudioGraphController,
  getAllStudiosController,
  getAllStudiosGraphController,
  getStudioController,
  getStudioGraphController,
  updateStudioController,
  updateStudioGraphController,
} from '@usecase/udesc/studio';

const routes = Router();

routes.get('/studio/:id', (req: Request, res: Response) =>
  getStudioController.handle(req, res)
);

routes.get('/studios', (req: Request, res: Response) =>
  getAllStudiosController.handle(req, res)
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

routes.get('/graph/studio/:id', (req: Request, res: Response) =>
  getStudioGraphController.handle(req, res)
);

routes.get('/graph/studios', (req: Request, res: Response) =>
  getAllStudiosGraphController.handle(req, res)
);

routes.post('/graph/studio', (req: Request, res: Response) =>
  createStudioGraphController.handle(req, res)
);

routes.patch('/graph/studio/:id', (req: Request, res: Response) =>
  updateStudioGraphController.handle(req, res)
);

routes.delete('/graph/studio/:id', (req: Request, res: Response) =>
  deleteStudioGraphController.handle(req, res)
);

export default routes;
