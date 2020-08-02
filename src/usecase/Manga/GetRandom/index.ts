import { GetRandomMangaUseCase } from './GetRandomMangaUseCase';
import { GetRandomMangaController } from './GetRandomMangaController';
import { mangaUtils } from '..';

const getRandomMangaUseCase = new GetRandomMangaUseCase(mangaUtils);

const getRandomMangaController = new GetRandomMangaController(
  getRandomMangaUseCase
);

export { getRandomMangaController, getRandomMangaUseCase };
