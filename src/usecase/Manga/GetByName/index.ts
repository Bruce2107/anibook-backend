import { GetByNameMangaUseCase } from './GetByNameMangaUseCase';
import { GetByNameMangaController } from './GetByNameMangaController';
import { mangaUtils } from '..';

const getByNameMangaUseCase = new GetByNameMangaUseCase(mangaUtils);

const getByNameMangaController = new GetByNameMangaController(
  getByNameMangaUseCase
);

export { getByNameMangaController, getByNameMangaUseCase };
