import { GetRandomCardMixedUseCase } from './GetRandomCardMixedUseCase';
import { GetRandomCardMixedController } from './GetRandomCardMixedController';
import { animeUtils } from '@usecase/Anime';
import { mangaUtils } from '@usecase/Manga';

const getRandomCardMixedUseCase = new GetRandomCardMixedUseCase(
  animeUtils,
  mangaUtils
);

const getRandomCardMixedController = new GetRandomCardMixedController(
  getRandomCardMixedUseCase
);

export { getRandomCardMixedController, getRandomCardMixedUseCase };
