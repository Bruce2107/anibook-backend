import {
  createImageController,
  deleteImageController,
  getImageController,
} from '@usecase/udesc/image';
import { fileUpload } from '@middleware/upload';
import { Router, Request, Response } from 'express';

const routes = Router();

routes.get('/udesc/image/:folder/:name', (req: Request, res: Response) =>
  getImageController.handle(req, res)
);

routes.get('/udesc/image/:id', (req: Request, res: Response) =>
  getImageController.handle(req, res)
);

routes.post('/udesc/image', fileUpload, (req: Request, res: Response) =>
  createImageController.handle(req, res)
);

routes.delete('/udesc/image/:id', (req: Request, res: Response) =>
  deleteImageController.handle(req, res)
);
export default routes;
