import { Router, Request, Response } from 'express';
import authenticate from '@middleware/authenticate';
import { fileUpload } from '@middleware/upload';
import { AnimeController } from '@usecase/Anime';
import { createAnimeController } from '@usecase/Anime/Create';
import { getRandomAnimeController } from '@usecase/Anime/GetRandom';
import { getSortAnimeController } from '@usecase/Anime/GetSort';
import { getByNameAnimeController } from '@usecase/Anime/GetByName';
import { getRandomCardAnimeController } from '@usecase/Anime/Card/GetRandom';
import { getSortCardAnimeController } from '@usecase/Anime/Card/GetSort';
import { getByNameCardAnimeController } from '@usecase/Anime/Card/GetByName';
import { updateImageAnimeController } from '@usecase/Anime/Update/Image';

const routes = Router();
const AC = new AnimeController();

routes.get('/animes', (req: Request, res: Response) =>
  getRandomAnimeController.handle(req, res)
);
routes.get('/animes/sort/:order', (req: Request, res: Response) =>
  getSortAnimeController.handle(req, res)
);
routes.get('/animes/:name', (req: Request, res: Response) =>
  getByNameAnimeController.handle(req, res)
);
routes.get('/animes/card/random', (req: Request, res: Response) =>
  getRandomCardAnimeController.handle(req, res)
);
routes.get('/animes/card/sort/:order', (req: Request, res: Response) =>
  getSortCardAnimeController.handle(req, res)
);
routes.get('/animes/card/:name', (req: Request, res: Response) =>
  getByNameCardAnimeController.handle(req, res)
);

routes.post(
  '/animes',
  [fileUpload, authenticate],
  (req: Request, res: Response) => createAnimeController.handle(req, res)
);

routes.patch(
  '/animes/image/:name',
  [fileUpload, authenticate],
  (req: Request, res: Response) => updateImageAnimeController.handle(req, res)
);
routes.patch('/animes/:name', authenticate, AC.updateAnyFieldThatAreNotAFile);

routes.delete('/animes/:name', authenticate, AC._delete);

export default routes;
