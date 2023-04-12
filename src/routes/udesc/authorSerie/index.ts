import { Router, Request, Response } from 'express';
import {
  createAuthorSerieController,
  deleteAuthorSerieController,
  getAuthorSerieController,
  updateAuthorSerieController,
} from '@usecase/udesc/authorSerie';

const routes = Router();

routes.get('/author/serie/:id', (req: Request, res: Response) =>
  getAuthorSerieController.handle(req, res)
);

routes.post('/author/serie', (req: Request, res: Response) =>
  createAuthorSerieController.handle(req, res)
);

routes.patch('/author/serie/:id', (req: Request, res: Response) =>
  updateAuthorSerieController.handle(req, res)
);

routes.delete('/author/serie/:id', (req: Request, res: Response) =>
  deleteAuthorSerieController.handle(req, res)
);

export default routes;
