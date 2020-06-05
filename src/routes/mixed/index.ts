import { Router } from 'express';
import getCardRandom from '../../controller/mixed/GetCardRandom';
import getRandom from '../../controller/mixed/GetRandom';
const routes = Router();

routes.get('/mixed/card/random', getCardRandom);
routes.get('/mixed/random', getRandom);

export default routes;
