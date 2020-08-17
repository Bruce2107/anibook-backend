import { UpdateTextAnimeUseCase } from './UpdateTextAnimeUseCase';
import { UpdateTextAnimeController } from './UpdateTextAnimeController';
import { animeUtils } from '@usecase/Anime';

const updateTextAnimeUseCase = new UpdateTextAnimeUseCase(animeUtils);

const updateTextAnimeController = new UpdateTextAnimeController(
  updateTextAnimeUseCase
);

export { updateTextAnimeController, updateTextAnimeUseCase };
