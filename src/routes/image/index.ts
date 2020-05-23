import { Router } from 'express';
import getImage from '../../controller/image/GetImage';

const routes = Router();

routes.get('/image/:folder/:name',getImage);

export default routes;
