import { Router } from 'express';
import authenticate from '@middleware/authenticate';
import { fileUpload } from '@middleware/upload';
import AnimeController from '@usecase/Anime';

const routes = Router();
const AC = new AnimeController();

routes.get('/animes', AC.getRandom);
routes.get('/animes/sort/:order', AC.getSort);
routes.get('/animes/:name', AC.getByName);
routes.get('/animes/card/random', AC.getRandomCards);
routes.get('/animes/card/sort/:order', AC.getSortCard);
routes.get('/animes/card/:name', AC.getCardByName);

routes.post('/animes', [fileUpload, authenticate], AC.create);

routes.patch(
  '/animes/image/:name',
  [fileUpload, authenticate],
  AC.updateImageField
);
routes.patch('/animes/:name', authenticate, AC.updateAnyFieldThatAreNotAFile);

routes.delete('/animes/:name', authenticate, AC._delete);

export default routes;
