import { Router, Request, Response } from 'express';
import {
  createStreamingController,
  deleteStreamingController,
  getAllStreamingsController,
  getStreamingController,
  updateStreamingController,
} from '@usecase/udesc/streaming';

const routes = Router();

routes.get('/streaming/:id', (req: Request, res: Response) =>
  getStreamingController.handle(req, res)
);

routes.get('/streamings', (req: Request, res: Response) =>
  getAllStreamingsController.handle(req, res)
);

routes.post('/streaming', (req: Request, res: Response) =>
  createStreamingController.handle(req, res)
);

routes.patch('/streaming/:id', (req: Request, res: Response) =>
  updateStreamingController.handle(req, res)
);

routes.delete('/streaming/:id', (req: Request, res: Response) =>
  deleteStreamingController.handle(req, res)
);

export default routes;
