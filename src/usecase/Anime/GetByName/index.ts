import { GetByNameAnimeUseCase } from './GetByNameAnimeUseCase';
import { GetByNameAnimeController } from './GetByNameAnimeController';
import { animeUtils } from '..';

const getByNameAnimeUseCase = new GetByNameAnimeUseCase(animeUtils);

const getByNameAnimeController = new GetByNameAnimeController(
  getByNameAnimeUseCase
);

export { getByNameAnimeController, getByNameAnimeUseCase };
