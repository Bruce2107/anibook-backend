import { Router, Request, Response } from 'express';
import { fileUpload } from '@middleware/upload';
import { ImageController } from '@usecase/Image';
import { createImageController } from '@usecase/Image/Create';
import { getImageController } from '@usecase/Image/Get/Image';

const routes = Router();
const IC = new ImageController();

routes.get('/image/:folder/:name', (req: Request, res: Response) =>
  getImageController.handle(req, res)
);
routes.get('/image/background', IC.getBackground);

routes.post('/image', fileUpload, (req: Request, res: Response) =>
  createImageController.handle(req, res)
);

routes.delete('/image/:folder/:name', IC.deleteImage);
export default routes;
