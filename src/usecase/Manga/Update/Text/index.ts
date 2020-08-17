import { UpdateTextMangaUseCase } from './UpdateTextMangaUseCase';
import { UpdateTextMangaController } from './UpdateTextMangaController';
import { mangaUtils } from '@usecase/Manga';

const updateTextMangaUseCase = new UpdateTextMangaUseCase(mangaUtils);

const updateTextMangaController = new UpdateTextMangaController(
  updateTextMangaUseCase
);

export { updateTextMangaController, updateTextMangaUseCase };
