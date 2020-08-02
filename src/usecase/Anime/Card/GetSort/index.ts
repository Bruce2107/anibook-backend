import { GetSortCardAnimeUseCase } from './GetSortCardAnimeUseCase';
import { GetSortCardAnimeController } from './GetSortCardAnimeController';
import { animeUtils } from '@usecase/Anime';

const getSortCardAnimeUseCase = new GetSortCardAnimeUseCase(animeUtils);

const getSortCardAnimeController = new GetSortCardAnimeController(
  getSortCardAnimeUseCase
);

export { getSortCardAnimeController, getSortCardAnimeUseCase };
