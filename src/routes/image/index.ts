import { Router } from 'express';
import { fileUpload } from '../../middleware/upload';
import _Image from '../../controller/image';
const routes = Router();

routes.get('/image/:folder/:name', _Image.getImage);
routes.get('/image/background', _Image.getBackground);

routes.post('/image', fileUpload, _Image.createImage);

routes.delete('/image/:folder/:name', _Image.deleteImage);
export default routes;
