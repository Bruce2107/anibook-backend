import { Router, Request, Response } from 'express';
import {
  createGalleryController,
  deleteGalleryController,
  getGalleryController,
  updateGalleryController,
} from '@usecase/udesc/gallery';

const routes = Router();

routes.get('/gallery/:id', (req: Request, res: Response) =>
  getGalleryController.handle(req, res)
);

routes.post('/gallery', (req: Request, res: Response) =>
  createGalleryController.handle(req, res)
);

routes.patch('/gallery/:id', (req: Request, res: Response) =>
  updateGalleryController.handle(req, res)
);

routes.delete('/gallery/:id', (req: Request, res: Response) =>
  deleteGalleryController.handle(req, res)
);

export default routes;
