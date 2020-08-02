import { UpdateImageMangaUseCase } from './UpdateImageMangaUseCase';
import { UpdateImageMangaController } from './UpdateImageMangaController';
import { mangaUtils } from '@usecase/Manga';

const updateImageMangaUseCase = new UpdateImageMangaUseCase(mangaUtils);

const updateImageMangaController = new UpdateImageMangaController(
  updateImageMangaUseCase
);

export { updateImageMangaController, updateImageMangaUseCase };
