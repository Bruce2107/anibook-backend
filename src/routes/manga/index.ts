import { Router } from 'express';
import authenticate from '../../middleware/authenticate';
import { fileUpload } from '../../middleware/upload';
import createManga from '../../controller/manga/CreateManga';
import deleteManga from '../../controller/manga/DeleteAnime';
import getAllMangas from '../../controller/manga/GetAllMangas';
import getByName from '../../controller/manga/GetOneMangaByName';
import getCard from '../../controller/manga/GetCardInformationsByName';
import getRandomCard from '../../controller/manga/GetRandomCardInformations';
import updateAnyFieldThatAreNotAFile from '../../controller/manga/UpdateAnyFieldThatAreNotAFile';
import updateImageField from '../../controller/manga/UpdateImageField';

const routes = Router();

routes.get('/manga', getAllMangas);
routes.get('/manga/:name', getByName);
routes.get('/manga/card/random', getRandomCard);
routes.get('/manga/card/:name', getCard);

routes.post('/manga', [fileUpload, authenticate], createManga);

routes.patch(
  '/manga/image/:name',
  [fileUpload, authenticate],
  updateImageField
);
routes.patch('/manga/:name', authenticate, updateAnyFieldThatAreNotAFile);

routes.delete('/manga/:name', authenticate, deleteManga);

export default routes;
