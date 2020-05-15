import { Router } from 'express';
import getAllAnimes from '../../controller/anime/GetAllAnimes';

const routes = Router();

routes.get('/anime', getAllAnimes);

export default routes;
