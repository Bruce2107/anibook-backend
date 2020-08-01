import { UpdateImageAnimeUseCase } from './UpdateImageAnimeUseCase';
import { UpdateImageAnimeController } from './UpdateImageAnimeController';
import { animeUtils } from '@usecase/Anime';

const updateImageAnimeUseCase = new UpdateImageAnimeUseCase(animeUtils);

const updateImageAnimeController = new UpdateImageAnimeController(
  updateImageAnimeUseCase
);

export { updateImageAnimeController, updateImageAnimeUseCase };
