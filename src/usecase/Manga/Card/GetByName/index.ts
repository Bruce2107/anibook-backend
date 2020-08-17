import { GetByNameCardMangaUseCase } from './GetByNameCardMangaUseCase';
import { GetByNameCardMangaController } from './GetByNameCardMangaController';
import { mangaUtils } from '@usecase/Manga';

const getByNameCardMangaUseCase = new GetByNameCardMangaUseCase(mangaUtils);

const getByNameCardMangaController = new GetByNameCardMangaController(
  getByNameCardMangaUseCase
);

export { getByNameCardMangaController, getByNameCardMangaUseCase };
