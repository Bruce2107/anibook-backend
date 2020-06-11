import { Router } from 'express';
import { fileUpload } from '../../middleware/upload';
import ImageController from '../../controller/image/index';

const routes = Router();
const IC = new ImageController();

routes.get('/image/:folder/:name',IC.getImage);
routes.get('/image/background', IC.getBackground);

routes.post('/image', fileUpload, IC.insertImage);

routes.delete('/image/:folder/:name', IC.deleteImage);
export default routes;
