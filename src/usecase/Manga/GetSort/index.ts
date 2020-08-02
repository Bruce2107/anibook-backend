import { GetSortMangaUseCase } from './GetSortMangaUseCase';
import { GetSortMangaController } from './GetSortMangaController';
import { mangaUtils } from '..';

const getSortMangaUseCase = new GetSortMangaUseCase(mangaUtils);

const getSortMangaController = new GetSortMangaController(getSortMangaUseCase);

export { getSortMangaController, getSortMangaUseCase };
