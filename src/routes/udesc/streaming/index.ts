import { Router, Request, Response } from 'express';
import {
  createStreamingController,
  createStreamingGraphController,
  deleteStreamingController,
  deleteStreamingGraphController,
  getAllStreamingsController,
  getAllStreamingsGraphController,
  getStreamingController,
  getStreamingGraphController,
  updateStreamingController,
  updateStreamingGraphController,
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

routes.get('/graph/streaming/:id', (req: Request, res: Response) =>
  getStreamingGraphController.handle(req, res)
);

routes.get('/graph/streamings', (req: Request, res: Response) =>
  getAllStreamingsGraphController.handle(req, res)
);

routes.post('/graph/streaming', (req: Request, res: Response) =>
  createStreamingGraphController.handle(req, res)
);

routes.patch('/graph/streaming/:id', (req: Request, res: Response) =>
  updateStreamingGraphController.handle(req, res)
);

routes.delete('/graph/streaming/:id', (req: Request, res: Response) =>
  deleteStreamingGraphController.handle(req, res)
);

export default routes;
