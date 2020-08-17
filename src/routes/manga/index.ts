import { Router, Request, Response } from 'express';
import authenticate from '@middleware/authenticate';
import { fileUpload } from '@middleware/upload';
import { getByNameCardMangaController } from '@usecase/Manga/Card/GetByName';
import { getRandomCardMangaController } from '@usecase/Manga/Card/GetRandom';
import { getSortCardMangaController } from '@usecase/Manga/Card/GetSort';
import { createMangaController } from '@usecase/Manga/Create';
import { deleteMangaController } from '@usecase/Manga/Delete';
import { getByNameMangaController } from '@usecase/Manga/GetByName';
import { getRandomMangaController } from '@usecase/Manga/GetRandom';
import { updateImageMangaController } from '@usecase/Manga/Update/Image';
import { updateTextMangaController } from '@usecase/Manga/Update/Text';

const routes = Router();

routes.get('/mangas', (req: Request, res: Response) =>
  getRandomMangaController.handle(req, res)
);
routes.get('/mangas/sort/:order', (req: Request, res: Response) =>
  getSortCardMangaController.handle(req, res)
);
routes.get('/mangas/:name', (req: Request, res: Response) =>
  getByNameMangaController.handle(req, res)
);
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
  (req: Request, res: Response) => updateImageMangaController.handle(req, res)
);
routes.patch('/mangas/:name', authenticate, (req: Request, res: Response) =>
  updateTextMangaController.handle(req, res)
);

routes.delete('/mangas/:name', authenticate, (req: Request, res: Response) =>
  deleteMangaController.handle(req, res)
);

export default routes;
