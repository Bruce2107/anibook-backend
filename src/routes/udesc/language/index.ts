import { Router, Request, Response } from 'express';
import {
  createLanguageController,
  deleteLanguageController,
  getLanguageController,
  updateLanguageController,
} from '@usecase/udesc/language';

const routes = Router();

routes.get('/language/:id', (req: Request, res: Response) =>
  getLanguageController.handle(req, res)
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

export default routes;
