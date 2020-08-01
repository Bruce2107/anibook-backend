import { Router, Request, Response } from 'express';
import authenticate from '@middleware/authenticate';
import { fileUpload } from '@middleware/upload';
import { MangaController } from '@usecase/Manga';
import { getByNameCardMangaController } from '@usecase/Manga/Card/GetByName';

const routes = Router();
const MC = new MangaController();

routes.get('/mangas', MC.getRandom);
routes.get('/mangas/sort/:order', MC.getSort);
routes.get('/mangas/:name', MC.getByName);
routes.get('/mangas/card/random', MC.getRandomCards);
routes.get('/mangas/card/sort/:order', MC.getSortCard);
routes.get('/mangas/card/:name', (req: Request, res: Response) =>
  getByNameCardMangaController.handle(req, res)
);

routes.post('/mangas', [fileUpload, authenticate], MC.create);

routes.patch(
  '/mangas/image/:name',
  [fileUpload, authenticate],
  MC.updateImageField
);
routes.patch('/mangas/:name', authenticate, MC.updateAnyFieldThatAreNotAFile);

routes.delete('/mangas/:name', authenticate, MC._delete);

export default routes;
