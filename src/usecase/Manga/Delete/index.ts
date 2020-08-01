import { DeleteMangaUseCase } from './DeleteMangaUseCase';
import { DeleteMangaController } from './DeleteMangaController';
import { mangaUtils } from '..';

const deleteMangaUseCase = new DeleteMangaUseCase(mangaUtils);

const deleteMangaController = new DeleteMangaController(deleteMangaUseCase);

export { deleteMangaController, deleteMangaUseCase };
