import { Router, Request, Response } from 'express';
import authenticate from '@middleware/authenticate';
import { fileUpload } from '@middleware/upload';
import { MangaController } from '@usecase/Manga';
import { getByNameCardMangaController } from '@usecase/Manga/Card/GetByName';
import { getRandomCardMangaController } from '@usecase/Manga/Card/GetRandom';
import { getSortCardMangaController } from '@usecase/Manga/Card/GetSort';
import { createMangaController } from '@usecase/Manga/Create';
import { deleteMangaController } from '@usecase/Manga/Delete';

const routes = Router();
const MC = new MangaController();

routes.get('/mangas', MC.getRandom);
routes.get('/mangas/sort/:order', MC.getSort);
routes.get('/mangas/:name', MC.getByName);
routes.get('/mangas/card/random', (req: Request, res: Response) =>
  getRandomCardMangaController.handle(req, res)
);
routes.get('/mangas/card/sort/:order', (req: Request, res: Response) =>
  getSortCardMangaController.handle(req, res)
);
routes.get('/mangas/card/:name', (req: Request, res: Response) =>
  getByNameCardMangaController.handle(req, res)
);

routes.post(
  '/mangas',
  [fileUpload, authenticate],
  (req: Request, res: Response) => createMangaController.handle(req, res)
);

routes.patch(
  '/mangas/image/:name',
  [fileUpload, authenticate],
  MC.updateImageField
);
routes.patch('/mangas/:name', authenticate, MC.updateAnyFieldThatAreNotAFile);

routes.delete('/mangas/:name', authenticate, (req: Request, res: Response) =>
  deleteMangaController.handle(req, res)
);

export default routes;
