import { Router } from 'express';
import { getRandomMixedController } from '@usecase/Mixed/GetRandom';
import { getRandomCardMixedController } from '@usecase/Mixed/Card/GetRandom';

const routes = Router();

routes.get('/mixed/card/random', (req, res) =>
  getRandomCardMixedController.handle(req, res)
);
routes.get('/mixed/random', (req, res) =>
  getRandomMixedController.handle(req, res)
);

export default routes;
