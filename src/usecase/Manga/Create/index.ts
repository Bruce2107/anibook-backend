import { CreateMangaUseCase } from './CreateMangaUseCase';
import { CreateMangaController } from './CreateMangaController';
import { mangaUtils } from '..';

const createMangaUseCase = new CreateMangaUseCase(mangaUtils);

const createMangaController = new CreateMangaController(createMangaUseCase);

export { createMangaController, createMangaUseCase };
