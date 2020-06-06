import { Router } from 'express';
import Token from '../../controller/token';

const routes = Router();

routes.get('/token/:nickname', Token.getToken);

routes.post('/token/user', Token.createUser);

export default routes;
