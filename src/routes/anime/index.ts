import { Router } from 'express';
import getAll from '../../controller/anime/GetAllAnimes';
import getByName from '../../controller/anime/GetOneAnimeByName';
import getCard from '../../controller/anime/GetCardInformationsByName';
import getRandomCard from '../../controller/anime/GetRandomCardInformations';

const routes = Router();

routes.get('/anime', getAll);
routes.get('/anime/:name', getByName);
routes.get('/anime/card/:name', getCard);
routes.get('/anime/card/random', getRandomCard);

export default routes;
