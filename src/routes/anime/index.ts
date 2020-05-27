import { Router } from 'express';
import getAll from '../../controller/anime/GetAllAnimes';
import getByName from '../../controller/anime/GetOneAnimeByName';
import getCard from '../../controller/anime/GetCardInformationsByName';
import getRandomCard from '../../controller/anime/GetRandomCardInformations';
import createAnime from '../../controller/anime/CreateAnime';
import updatePhoto from '../../controller/anime/UpdatePhoto';
import updateAnyFieldThatAreNotAFile from '../../controller/anime/UpdateAnyFieldThatAreNotAFile';
import updateImageField from '../../controller/anime/UpdateImageField';
import deleteAnime from '../../controller/anime/DeleteAnime';
import { upload, fileUpload } from '../../utils/upload';
import authenticate from '../../middleware/authenticate';

const routes = Router();

routes.get('/anime', getAll);
routes.get('/anime/:name', getByName);
routes.get('/anime/card/random', getRandomCard);
routes.get('/anime/card/:name', getCard);

routes.post('/anime', [fileUpload, authenticate], createAnime);

routes.patch(
  '/anime/card/:name',
  [upload.single('card'), authenticate],
  updatePhoto
);
routes.patch(
  '/anime/image/:name',
  [upload.array('images'), authenticate],
  updateImageField
);
routes.patch('/anime/:name', authenticate, updateAnyFieldThatAreNotAFile);

routes.delete('/anime/:name', authenticate, deleteAnime);

export default routes;
