import { Router } from 'express';
import authenticate from '../../middleware/authenticate';
import { fileUpload } from '../../middleware/upload';
import Anime from '../../controller/anime_manga';

const routes = Router();

routes.get('/animes', Anime.getRandom);
routes.get('/animes/:name', Anime.getOneByName);
routes.get('/animes/card/random', Anime.getRandomCard);
routes.get('/animes/card/:name', Anime.getRandomCard);

routes.post('/animes', [fileUpload, authenticate], Anime.create);

routes.patch(
  '/animes/image/:name',
  [fileUpload, authenticate],
  Anime.updateImageFields
);
routes.patch(
  '/animes/:name',
  authenticate,
  Anime.updateAnyFieldThatAreNotAFile
);

routes.delete('/animes/:name', authenticate, Anime._delete);

export default routes;
