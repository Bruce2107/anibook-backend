import { Router } from 'express';
import authenticate from '../../middleware/authenticate';
import { fileUpload } from '../../middleware/upload';
import create from '../../controller/anime_manga/Create';
import _delete from '../../controller/anime_manga/Delete';
import getRandom from '../../controller/anime_manga/GetRandom';
import getByName from '../../controller/anime_manga/GetOneByName';
import getCard from '../../controller/anime_manga/GetCardByName';
import getRandomCard from '../../controller/anime_manga/GetRandomCard';
import updateAnyFieldThatAreNotAFile from '../../controller/anime_manga/UpdateAnyFieldThatAreNotAFile';
import updateImageField from '../../controller/anime_manga/UpdateImageField';

const routes = Router();

routes.get('/animes', getRandom);
routes.get('/animes/:name', getByName);
routes.get('/animes/card/random', getRandomCard);
routes.get('/animes/card/:name', getCard);

routes.post('/animes', [fileUpload, authenticate], create);

routes.patch(
  '/animes/image/:name',
  [fileUpload, authenticate],
  updateImageField
);
routes.patch('/animes/:name', authenticate, updateAnyFieldThatAreNotAFile);

routes.delete('/animes/:name', authenticate, _delete);

export default routes;
