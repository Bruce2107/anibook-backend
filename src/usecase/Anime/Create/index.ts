import { CreateAnimeUseCase } from './CreateAnimeUseCase';
import { CreateAnimeController } from './CreateAnimeController';
import { animeUtils } from '..';

const createAnimeUseCase = new CreateAnimeUseCase(animeUtils);

const createAnimeController = new CreateAnimeController(createAnimeUseCase);

export { createAnimeController, createAnimeUseCase };
