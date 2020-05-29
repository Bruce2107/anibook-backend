import { Router } from 'express';
import { upload } from '../../middleware/upload';
import deleteImage from '../../controller/image/DeleteImage';
import getImage from '../../controller/image/GetImage';
import getRandomBackground from '../../controller/image/GetRandomBackground';
import insertImages from '../../controller/image/InsertImages';

const routes = Router();

routes.get('/image/:folder/:name', getImage);
routes.get('/image/background', getRandomBackground);

routes.post('/image', upload.array('images'), insertImages);

routes.delete('/image/:folder/:name', deleteImage);
export default routes;
