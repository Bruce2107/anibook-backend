import { Router } from 'express';
import createUser from '../../controller/token/CreateUser';
import getToken from '../../controller/token/GetToken';

const routes = Router();

routes.get('/token/:nickname',getToken);

routes.post('/token/user', createUser);

export default routes;
