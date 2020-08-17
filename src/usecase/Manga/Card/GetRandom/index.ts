import { GetRandomCardMangaUseCase } from './GetRandomCardMangaUseCase';
import { GetRandomCardMangaController } from './GetRandomCardMangaController';
import { mangaUtils } from '@usecase/Manga';

const getRandomCardMangaUseCase = new GetRandomCardMangaUseCase(mangaUtils);

const getRandomCardMangaController = new GetRandomCardMangaController(
  getRandomCardMangaUseCase
);

export { getRandomCardMangaController, getRandomCardMangaUseCase };
