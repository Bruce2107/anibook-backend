import { Router, Request, Response } from 'express';
import { fileUpload } from '@middleware/upload';
import { createImageController } from '@usecase/Image/Create';
import { getImageController } from '@usecase/Image/Get/Image';
import { getBackgroundController } from '@usecase/Image/Get/Background';
import { deleteImageController } from '@usecase/Image/Delete';

const routes = Router();

routes.get('/image/:folder/:name', (req: Request, res: Response) =>
  getImageController.handle(req, res)
);
routes.get('/image/background', (req: Request, res: Response) =>
  getBackgroundController.handle(req, res)
);

routes.post('/image', fileUpload, (req: Request, res: Response) =>
  createImageController.handle(req, res)
);

routes.delete('/image/:folder/:name', (req: Request, res: Response) =>
  deleteImageController.handle(req, res)
);
export default routes;
