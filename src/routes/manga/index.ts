import { Router } from 'express';
import authenticate from '../../middleware/authenticate';
import { fileUpload } from '../../middleware/upload';
import Manga from '../../controller/anime_manga';

const routes = Router();

routes.get('/mangas', Manga.getRandom);
routes.get('/mangas/:name', Manga.getOneByName);
routes.get('/mangas/card/random', Manga.getRandomCard);
routes.get('/mangas/card/:name', Manga.getCardByName);

routes.post('/mangas', [fileUpload, authenticate], Manga.create);

routes.patch(
  '/mangas/image/:name',
  [fileUpload, authenticate],
  Manga.updateImageFields
);
routes.patch(
  '/mangas/:name',
  authenticate,
  Manga.updateAnyFieldThatAreNotAFile
);

routes.delete('/mangas/:name', authenticate, Manga._delete);

export default routes;
