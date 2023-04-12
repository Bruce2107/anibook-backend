import {
  createAuthorController,
  deleteAuthorController,
  getAuthorController,
  updateAuthorController,
} from '@usecase/udesc/author';
import { Router, Request, Response } from 'express';

const routes = Router();

routes.get('/author/:name', (req: Request, res: Response) =>
  getAuthorController.handle(req, res)
);

routes.post('/author', (req: Request, res: Response) =>
  createAuthorController.handle(req, res)
);

routes.patch('/author/:id', (req: Request, res: Response) =>
  updateAuthorController.handle(req, res)
);

routes.delete('/author/:id', (req: Request, res: Response) =>
  deleteAuthorController.handle(req, res)
);

export default routes;
