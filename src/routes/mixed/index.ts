import { Router } from 'express';
import Mixed from '../../controller/mixed';

const routes = Router();

routes.get('/mixed/card/random', Mixed.getRandomCard);
routes.get('/mixed/random', Mixed.getRandom);

export default routes;
