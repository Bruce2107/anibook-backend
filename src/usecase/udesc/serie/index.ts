import { CreateSerieUseCase, CreateSerieController } from './CreateSerie';
import { GetSerieController, GetSerieUseCase } from './GetSerie';
import { DeleteSerieUseCase, DeleteSerieController } from './DeleteSerie';
import { UpdateSerieUseCase, UpdateSerieController } from './UpdateSerie';
import { SerieRepositoryRelationalImpl } from '@adapter/udesc/serie/SerieRelationalImpl';

const databaseSerieRepository = new SerieRepositoryRelationalImpl();

const getSerieUseCase = new GetSerieUseCase(databaseSerieRepository);
const getSerieController = new GetSerieController(getSerieUseCase);

const createSerieUseCase = new CreateSerieUseCase(databaseSerieRepository);
const createSerieController = new CreateSerieController(createSerieUseCase);

const deleteSerieUseCase = new DeleteSerieUseCase(databaseSerieRepository);
const deleteSerieController = new DeleteSerieController(deleteSerieUseCase);

const updateSerieUseCase = new UpdateSerieUseCase(databaseSerieRepository);
const updateSerieController = new UpdateSerieController(updateSerieUseCase);

export {
  getSerieController,
  getSerieUseCase,
  createSerieController,
  createSerieUseCase,
  deleteSerieController,
  deleteSerieUseCase,
  updateSerieController,
  updateSerieUseCase,
  databaseSerieRepository,
};
