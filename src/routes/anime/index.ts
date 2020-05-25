import { Router } from 'express';
import { authenticate } from 'passport';
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
const routes = Router();

routes.get('/anime', getAll);
routes.get('/anime/:name', getByName);
routes.get('/anime/card/random', getRandomCard);
routes.get('/anime/card/:name', getCard);

routes.post(
  '/anime',
  [fileUpload, authenticate('jwt', { session: false })],
  createAnime
);

routes.patch(
  '/anime/card/:name',
  [upload.single('card'), authenticate('jwt', { session: false })],
  updatePhoto
);
routes.patch(
  '/anime/image/:name',
  [upload.array('images'), authenticate('jwt', { session: false })],
  updateImageField
);
routes.patch(
  '/anime/:name',
  authenticate('jwt', { session: false }),
  updateAnyFieldThatAreNotAFile
);

routes.delete(
  '/anime/:name',
  authenticate('jwt', { session: false }),
  deleteAnime
);

export default routes;
