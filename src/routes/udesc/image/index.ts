import {
  createImageController,
  createImageGraphController,
  deleteImageController,
  deleteImageGraphController,
  getImageController,
  getImageGraphController,
  updateImageController,
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

routes.patch('/udesc/image/:id', fileUpload, (req: Request, res: Response) =>
  updateImageController.handle(req, res)
);

routes.delete('/udesc/image/:id', (req: Request, res: Response) =>
  deleteImageController.handle(req, res)
);

routes.get('/udesc/graph/image/:folder/:name', (req: Request, res: Response) =>
  getImageGraphController.handle(req, res)
);

routes.get('/udesc/graph/image/background', (req: Request, res: Response) =>
  getImageGraphController.handle(req, res)
);

routes.post('/udesc/graph/image', (req: Request, res: Response) =>
  createImageGraphController.handle(req, res)
);

routes.patch(
  '/udesc/graph/image/:id',
  fileUpload,
  (req: Request, res: Response) => updateImageController.handle(req, res)
);

routes.delete(
  '/udesc/graph/image/:folder/:name',
  (req: Request, res: Response) => deleteImageGraphController.handle(req, res)
);

export default routes;
