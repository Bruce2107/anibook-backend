import { GetRandomAnimeUseCase } from './GetRandomAnimeUseCase';
import { GetRandomAnimeController } from './GetRandomAnimeController';
import { animeUtils } from '..';

const getRandomAnimeUseCase = new GetRandomAnimeUseCase(animeUtils);

const getRandomAnimeController = new GetRandomAnimeController(
  getRandomAnimeUseCase
);

export { getRandomAnimeController, getRandomAnimeUseCase };
