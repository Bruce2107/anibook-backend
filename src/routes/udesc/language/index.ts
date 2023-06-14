import { Router, Request, Response } from 'express';
import {
  createLanguageController,
  createLanguageGraphController,
  deleteLanguageController,
  deleteLanguageGraphController,
  getAllLanguagesController,
  getAllLanguagesGraphController,
  getLanguageController,
  getLanguageGraphController,
  updateLanguageController,
  updateLanguageGraphController,
} from '@usecase/udesc/language';

const routes = Router();

routes.get('/language/:id', (req: Request, res: Response) =>
  getLanguageController.handle(req, res)
);

routes.get('/languages', (req: Request, res: Response) =>
  getAllLanguagesController.handle(req, res)
);

routes.post('/language', (req: Request, res: Response) =>
  createLanguageController.handle(req, res)
);

routes.patch('/language/:id', (req: Request, res: Response) =>
  updateLanguageController.handle(req, res)
);

routes.delete('/language/:id', (req: Request, res: Response) =>
  deleteLanguageController.handle(req, res)
);

routes.get('/graph/language/:id', (req: Request, res: Response) =>
  getLanguageGraphController.handle(req, res)
);

routes.get('/graph/languages', (req: Request, res: Response) =>
  getAllLanguagesGraphController.handle(req, res)
);

routes.post('/graph/language', (req: Request, res: Response) =>
  createLanguageGraphController.handle(req, res)
);

routes.patch('/graph/language/:id', (req: Request, res: Response) =>
  updateLanguageGraphController.handle(req, res)
);

routes.delete('/graph/language/:id', (req: Request, res: Response) =>
  deleteLanguageGraphController.handle(req, res)
);

export default routes;
