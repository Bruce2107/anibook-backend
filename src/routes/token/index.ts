import { Router } from 'express';
import { createUserController } from '@usecase/Token/Create';
import { getUserController } from '@usecase/Token/GetUser';

const routes = Router();

routes.get('/token/:nickname', (req, res) =>
  getUserController.handle(req, res)
);

routes.post('/token/user', (req, res) => createUserController.handle(req, res));

export default routes;
