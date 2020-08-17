import { GetSortCardMangaUseCase } from './GetSortCardMangaUseCase';
import { GetSortCardMangaController } from './GetSortCardMangaController';
import { mangaUtils } from '@usecase/Manga';

const getSortCardMangaUseCase = new GetSortCardMangaUseCase(mangaUtils);

const getSortCardMangaController = new GetSortCardMangaController(
  getSortCardMangaUseCase
);

export { getSortCardMangaController, getSortCardMangaUseCase };
