import {
  getSerieMusicController,
  getSerieMusicGraphController,
  getSerieStreamingController,
  getSerieStreamingGraphController,
  getSerieStudioController,
  getSerieStudioGraphController,
} from '@usecase/udesc/report';
import { Router, Request, Response } from 'express';

const routes = Router();

routes.get('/report/serie/studio', (req: Request, res: Response) =>
  getSerieStudioController.handle(req, res)
);

routes.get('/report/serie/music', (req: Request, res: Response) =>
  getSerieMusicController.handle(req, res)
);

routes.get('/report/serie/streaming', (req: Request, res: Response) =>
  getSerieStreamingController.handle(req, res)
);

routes.get('/graph/report/serie/studio', (req: Request, res: Response) =>
  getSerieStudioGraphController.handle(req, res)
);

routes.get('/graph/report/serie/music', (req: Request, res: Response) =>
  getSerieMusicGraphController.handle(req, res)
);

routes.get('/graph/report/serie/streaming', (req: Request, res: Response) =>
  getSerieStreamingGraphController.handle(req, res)
);

export default routes;
