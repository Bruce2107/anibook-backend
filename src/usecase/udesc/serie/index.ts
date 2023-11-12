import { CreateSerieUseCase, CreateSerieController } from './CreateSerie';
import { GetSerieController, GetSerieUseCase } from './GetSerie';
import { DeleteSerieUseCase, DeleteSerieController } from './DeleteSerie';
import { UpdateSerieUseCase, UpdateSerieController } from './UpdateSerie';
import { SerieRepositoryRelationalImpl } from '@adapter/udesc/serie/SerieRelationalImpl';
import { GetAllSeriesUseCase, GetAllSeriesController } from './GetAllSeries';
import { SerieRepositoryGraphImpl } from '@adapter/udesc/serie/SerieRepositoryGraphImpl';
import {
  GetAllSeriesByAnyController,
  GetAllSeriesByAnyUseCase,
} from './GetAllSeriesByAny';

const databaseSerieRepository = new SerieRepositoryRelationalImpl();

const getSerieUseCase = new GetSerieUseCase(databaseSerieRepository);
const getSerieController = new GetSerieController(getSerieUseCase);

const getAllSeriesUseCase = new GetAllSeriesUseCase(databaseSerieRepository);
const getAllSeriesController = new GetAllSeriesController(getAllSeriesUseCase);

const createSerieUseCase = new CreateSerieUseCase(databaseSerieRepository);
const createSerieController = new CreateSerieController(createSerieUseCase);

const deleteSerieUseCase = new DeleteSerieUseCase(databaseSerieRepository);
const deleteSerieController = new DeleteSerieController(deleteSerieUseCase);

const updateSerieUseCase = new UpdateSerieUseCase(databaseSerieRepository);
const updateSerieController = new UpdateSerieController(updateSerieUseCase);

const databaseSerieGraphRepository = new SerieRepositoryGraphImpl();

const getSerieGraphUseCase = new GetSerieUseCase(databaseSerieGraphRepository);
const getSerieGraphController = new GetSerieController(getSerieGraphUseCase);

const getAllSeriesGraphUseCase = new GetAllSeriesUseCase(
  databaseSerieGraphRepository
);
const getAllSeriesGraphController = new GetAllSeriesController(
  getAllSeriesGraphUseCase
);

const getAllSeriesByAnyGraphUseCase = new GetAllSeriesByAnyUseCase(
  databaseSerieGraphRepository
);
const getAllSeriesByAnyGraphController = new GetAllSeriesByAnyController(
  getAllSeriesByAnyGraphUseCase
);

const createSerieGraphUseCase = new CreateSerieUseCase(
  databaseSerieGraphRepository
);
const createSerieGraphController = new CreateSerieController(
  createSerieGraphUseCase
);

const deleteSerieGraphUseCase = new DeleteSerieUseCase(
  databaseSerieGraphRepository
);
const deleteSerieGraphController = new DeleteSerieController(
  deleteSerieGraphUseCase
);

const updateSerieGraphUseCase = new UpdateSerieUseCase(
  databaseSerieGraphRepository
);
const updateSerieGraphController = new UpdateSerieController(
  updateSerieGraphUseCase
);

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
  getAllSeriesController,
  getSerieGraphController,
  getAllSeriesGraphController,
  createSerieGraphController,
  deleteSerieGraphController,
  updateSerieGraphController,
  getAllSeriesByAnyGraphController,
};
