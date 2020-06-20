import { Router } from 'express';
import TokenController from '@usecase/Token';

const routes = Router();
const TC = new TokenController();

routes.get('/token/:nickname', TC.getToken);

routes.post('/token/user', TC.createUser);

export default routes;
