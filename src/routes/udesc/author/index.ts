import {
  createAuthorController,
  deleteAuthorController,
  getAllAuthorsController,
  getAuthorController,
  updateAuthorController,
  getAuthorGraphController,
  getAllAuthorsGraphController,
  createAuthorGraphController,
  deleteAuthorGraphController,
  updateAuthorGraphController,
} from '@usecase/udesc/author';
import { Router, Request, Response } from 'express';

const routes = Router();

routes.get('/author/:name', (req: Request, res: Response) =>
  getAuthorController.handle(req, res)
);

routes.get('/authors', (req: Request, res: Response) =>
  getAllAuthorsController.handle(req, res)
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

routes.get('/graph/author/:name', (req: Request, res: Response) =>
  getAuthorGraphController.handle(req, res)
);

routes.get('/graph/authors', (req: Request, res: Response) =>
  getAllAuthorsGraphController.handle(req, res)
);

routes.post('/graph/author', (req: Request, res: Response) =>
  createAuthorGraphController.handle(req, res)
);

routes.patch('/graph/author/:id', (req: Request, res: Response) =>
  updateAuthorGraphController.handle(req, res)
);

routes.delete('/graph/author/:id', (req: Request, res: Response) =>
  deleteAuthorGraphController.handle(req, res)
);

export default routes;
