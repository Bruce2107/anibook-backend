import { Router } from 'express';
import { upload } from '../../utils/upload';
import getImage from '../../controller/image/GetImage';
import getRandomBackground from '../../controller/image/GetRandomBackground';
import insertImages from '../../controller/image/InsertImages';
import deleteImage from '../../controller/image/DeleteImage';

const routes = Router();

routes.get('/image/:folder/:name', getImage);
routes.get('/image/background', getRandomBackground);

routes.post('/image', upload.array('images'), insertImages);

routes.delete('/image/:folder/:name', deleteImage);
export default routes;
