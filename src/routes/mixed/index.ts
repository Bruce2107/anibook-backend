import { Router } from 'express';
import MixedController from '@usecase/Mixed';

const routes = Router();
const MC = new MixedController();
routes.get('/mixed/card/random', MC.getRandomCard);
routes.get('/mixed/random', MC.getRandom);

export default routes;
