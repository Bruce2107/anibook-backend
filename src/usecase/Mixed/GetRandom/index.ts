import { GetRandomMixedUseCase } from './GetRandomMixedUseCase';
import { GetRandomMixedController } from './GetRandomMixedController';
import { animeUtils } from '@usecase/Anime';
import { mangaUtils } from '@usecase/Manga';

const getRandomMixedUseCase = new GetRandomMixedUseCase(animeUtils, mangaUtils);

const getRandomMixedController = new GetRandomMixedController(
  getRandomMixedUseCase
);

export { getRandomMixedController, getRandomMixedUseCase };
