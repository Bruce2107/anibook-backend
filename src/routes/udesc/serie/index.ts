import { Router, Request, Response } from 'express';
import {
  createSerieController,
  createSerieGraphController,
  deleteSerieController,
  deleteSerieGraphController,
  getAllSeriesController,
  getAllSeriesGraphController,
  getSerieController,
  getSerieGraphController,
  updateSerieController,
  updateSerieGraphController,
} from '@usecase/udesc/serie';

const routes = Router();

routes.get('/serie/:id', (req: Request, res: Response) =>
  getSerieController.handle(req, res)
);

routes.get('/series', (req: Request, res: Response) =>
  getAllSeriesController.handle(req, res)
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

routes.get('/graph/serie/:id', (req: Request, res: Response) =>
  getSerieGraphController.handle(req, res)
);

routes.get('/graph/series', (req: Request, res: Response) =>
  getAllSeriesGraphController.handle(req, res)
);

routes.post('/graph/serie', (req: Request, res: Response) =>
  createSerieGraphController.handle(req, res)
);

routes.patch('/graph/serie/:id', (req: Request, res: Response) =>
  updateSerieGraphController.handle(req, res)
);

routes.delete('/graph/serie/:id', (req: Request, res: Response) =>
  deleteSerieGraphController.handle(req, res)
);

export default routes;
