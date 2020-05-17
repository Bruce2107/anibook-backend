import { Router } from 'express';
import getAll from '../../controller/anime/GetAllAnimes';
import getByName from '../../controller/anime/GetOneAnimeByName';
import getCard from '../../controller/anime/GetCardInformationsByName';
import getRandomCard from '../../controller/anime/GetRandomCardInformations';
import createAnime from '../../controller/anime/CreateAnime';
import deleteAnime from '../../controller/anime/DeleteAnime';

const routes = Router();

routes.get('/anime', getAll);
routes.get('/anime/:name', getByName);
routes.get('/anime/card/:name', getCard);
routes.get('/anime/card/random', getRandomCard);

routes.post('/anime', createAnime);

routes.delete('/anime/:name', deleteAnime)
export default routes;
