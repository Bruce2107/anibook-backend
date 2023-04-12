import { Router, Request, Response } from 'express';
import {
  createStreamingLanguageController,
  deleteStreamingLanguageController,
  getStreamingLanguageController,
  updateStreamingLanguageController,
} from '@usecase/udesc/streamingLanguage';

const routes = Router();

routes.get('/streaming/language/:id', (req: Request, res: Response) =>
  getStreamingLanguageController.handle(req, res)
);

routes.post('/streaming/language', (req: Request, res: Response) =>
  createStreamingLanguageController.handle(req, res)
);

routes.patch('/streaming/language/:id', (req: Request, res: Response) =>
  updateStreamingLanguageController.handle(req, res)
);

routes.delete('/streaming/language/:id', (req: Request, res: Response) =>
  deleteStreamingLanguageController.handle(req, res)
);

export default routes;
