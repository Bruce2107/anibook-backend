import { GetByNameCardAnimeUseCase } from './GetByNameCardAnimeUseCase';
import { GetByNameCardAnimeController } from './GetByNameCardAnimeController';
import { animeUtils } from '@usecase/Anime';

const getByNameCardAnimeUseCase = new GetByNameCardAnimeUseCase(animeUtils);

const getByNameCardAnimeController = new GetByNameCardAnimeController(
  getByNameCardAnimeUseCase
);

export { getByNameCardAnimeController, getByNameCardAnimeUseCase };
