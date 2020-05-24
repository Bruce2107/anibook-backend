import { Router } from 'express';
import getImage from '../../controller/image/GetImage';
import { upload } from '../../utils/upload';
import insertImages from '../../controller/image/InsertImages';

const routes = Router();

routes.get('/image/:folder/:name', getImage);

routes.post('/image', upload.array('images'), insertImages);
export default routes;
