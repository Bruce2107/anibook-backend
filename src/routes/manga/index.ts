import { Router } from 'express';
import authenticate from '../../middleware/authenticate';
import { fileUpload } from '../../middleware/upload';
import create from '../../controller/anime_manga/Create';
import _delete from '../../controller/anime_manga/Delete';
import getAll from '../../controller/anime_manga/GetAll';
import getByName from '../../controller/anime_manga/GetOneByName';
import getCard from '../../controller/anime_manga/GetCardByName';
import getRandomCard from '../../controller/anime_manga/GetRandomCard';
import updateAnyFieldThatAreNotAFile from '../../controller/anime_manga/UpdateAnyFieldThatAreNotAFile';
import updateImageField from '../../controller/anime_manga/UpdateImageField';

const routes = Router();

routes.get('/mangas', getAll);
routes.get('/mangas/:name', getByName);
routes.get('/mangas/card/random', getRandomCard);
routes.get('/mangas/card/:name', getCard);

routes.post('/mangas', [fileUpload, authenticate], create);

routes.patch(
  '/mangas/image/:name',
  [fileUpload, authenticate],
  updateImageField
);
routes.patch('/mangas/:name', authenticate, updateAnyFieldThatAreNotAFile);

routes.delete('/mangas/:name', authenticate, _delete);

export default routes;
