import { DeleteAnimeUseCase } from './DeleteAnimeUseCase';
import { DeleteAnimeController } from './DeleteAnimeController';
import { animeUtils } from '..';

const deleteAnimeUseCase = new DeleteAnimeUseCase(animeUtils);

const deleteAnimeController = new DeleteAnimeController(deleteAnimeUseCase);

export { deleteAnimeController, deleteAnimeUseCase };
