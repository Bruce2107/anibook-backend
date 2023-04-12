import {
  CreateSerieStreamingUseCase,
  CreateSerieStreamingController,
} from './CreateSerieStreaming';
import {
  GetSerieStreamingController,
  GetSerieStreamingUseCase,
} from './GetSerieStreaming';
import {
  DeleteSerieStreamingUseCase,
  DeleteSerieStreamingController,
} from './DeleteSerieStreaming';
import {
  UpdateSerieStreamingUseCase,
  UpdateSerieStreamingController,
} from './UpdateSerieStreaming';
import { SerieStreamingRepositoryRelationalImpl } from '@adapter/udesc/serieStreaming/SerieStreamingRepositoryRelationalImpl';

const databaseSerieStreamingRepository = new SerieStreamingRepositoryRelationalImpl();

const getSerieStreamingUseCase = new GetSerieStreamingUseCase(
  databaseSerieStreamingRepository
);
const getSerieStreamingController = new GetSerieStreamingController(
  getSerieStreamingUseCase
);

const createSerieStreamingUseCase = new CreateSerieStreamingUseCase(
  databaseSerieStreamingRepository
);
const createSerieStreamingController = new CreateSerieStreamingController(
  createSerieStreamingUseCase
);

const deleteSerieStreamingUseCase = new DeleteSerieStreamingUseCase(
  databaseSerieStreamingRepository
);
const deleteSerieStreamingController = new DeleteSerieStreamingController(
  deleteSerieStreamingUseCase
);

const updateSerieStreamingUseCase = new UpdateSerieStreamingUseCase(
  databaseSerieStreamingRepository
);
const updateSerieStreamingController = new UpdateSerieStreamingController(
  updateSerieStreamingUseCase
);

export {
  getSerieStreamingController,
  getSerieStreamingUseCase,
  createSerieStreamingController,
  createSerieStreamingUseCase,
  deleteSerieStreamingController,
  deleteSerieStreamingUseCase,
  updateSerieStreamingController,
  updateSerieStreamingUseCase,
  databaseSerieStreamingRepository,
};
