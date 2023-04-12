import { Router, Request, Response } from 'express';
import {
  createSerieStreamingController,
  deleteSerieStreamingController,
  getSerieStreamingController,
  updateSerieStreamingController,
} from '@usecase/udesc/serieStreaming';

const routes = Router();

routes.get('/serie/streaming/:id', (req: Request, res: Response) =>
  getSerieStreamingController.handle(req, res)
);

routes.post('/serie/streaming', (req: Request, res: Response) =>
  createSerieStreamingController.handle(req, res)
);

routes.patch('/serie/streaming/:id', (req: Request, res: Response) =>
  updateSerieStreamingController.handle(req, res)
);

routes.delete('/serie/streaming/:id', (req: Request, res: Response) =>
  deleteSerieStreamingController.handle(req, res)
);

export default routes;
