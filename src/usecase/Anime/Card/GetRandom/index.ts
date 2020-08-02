import { GetRandomCardAnimeUseCase } from './GetRandomCardAnimeUseCase';
import { GetRandomCardAnimeController } from './GetRandomCardAnimeController';
import { animeUtils } from '@usecase/Anime';

const getRandomCardAnimeUseCase = new GetRandomCardAnimeUseCase(animeUtils);

const getRandomCardAnimeController = new GetRandomCardAnimeController(
  getRandomCardAnimeUseCase
);

export { getRandomCardAnimeController, getRandomCardAnimeUseCase };
