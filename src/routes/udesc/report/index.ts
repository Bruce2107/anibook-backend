import {
  getDetailsGraphController,
  getHomeGraphController,
  getSerieMusicController,
  getSerieMusicGraphController,
  getSerieStreamingController,
  getSerieStreamingGraphController,
  getSerieStudioController,
  getSerieStudioGraphController,
  userLoginGraphController,
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

routes.get('/graph/report/home', (req: Request, res: Response) =>
  getHomeGraphController.handle(req, res)
);

routes.get('/graph/report/details/:id', (req: Request, res: Response) =>
  getDetailsGraphController.handle(req, res)
);

routes.post('/graph/report/login', (req: Request, res: Response) =>
  userLoginGraphController.handle(req, res)
);

export default routes;
