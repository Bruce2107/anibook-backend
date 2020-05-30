import { Router } from 'express';
import authenticate from '../../middleware/authenticate';
import { fileUpload } from '../../middleware/upload';
import createAnime from '../../controller/anime/CreateAnime';
import deleteAnime from '../../controller/anime/DeleteAnime';
import getAll from '../../controller/anime/GetAllAnimes';
import getByName from '../../controller/anime/GetOneAnimeByName';
import getCard from '../../controller/anime/GetCardInformationsByName';
import getRandomCard from '../../controller/anime/GetRandomCardInformations';
import updateAnyFieldThatAreNotAFile from '../../controller/anime/UpdateAnyFieldThatAreNotAFile';
import updateImageField from '../../controller/anime/UpdateImageField';

const routes = Router();

routes.get('/anime', getAll);
routes.get('/anime/:name', getByName);
routes.get('/anime/card/random', getRandomCard);
routes.get('/anime/card/:name', getCard);

routes.post('/anime', [fileUpload, authenticate], createAnime);

routes.patch(
  '/anime/image/:name',
  [fileUpload, authenticate],
  updateImageField
);
routes.patch('/anime/:name', authenticate, updateAnyFieldThatAreNotAFile);

routes.delete('/anime/:name', authenticate, deleteAnime);

export default routes;
