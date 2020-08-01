import { GetSortAnimeUseCase } from './GetSortAnimeUseCase';
import { GetSortAnimeController } from './GetSortAnimeController';
import { animeUtils } from '..';

const getSortAnimeUseCase = new GetSortAnimeUseCase(animeUtils);

const getSortAnimeController = new GetSortAnimeController(getSortAnimeUseCase);

export { getSortAnimeController, getSortAnimeUseCase };
