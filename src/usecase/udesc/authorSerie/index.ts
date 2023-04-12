import {
  CreateAuthorSerieUseCase,
  CreateAuthorSerieController,
} from './CreateAuthorSerie';
import {
  GetAuthorSerieController,
  GetAuthorSerieUseCase,
} from './GetAuthorSerie';
import {
  DeleteAuthorSerieUseCase,
  DeleteAuthorSerieController,
} from './DeleteAuthorSerie';
import {
  UpdateAuthorSerieUseCase,
  UpdateAuthorSerieController,
} from './UpdateAuthorSerie';
import { AuthorSerieRepositoryRelationalImpl } from '@adapter/udesc/authorSerie/AuthorSerieRepositoryRelationalImpl';

const databaseAuthorSerieRepository = new AuthorSerieRepositoryRelationalImpl();

const getAuthorSerieUseCase = new GetAuthorSerieUseCase(
  databaseAuthorSerieRepository
);
const getAuthorSerieController = new GetAuthorSerieController(
  getAuthorSerieUseCase
);

const createAuthorSerieUseCase = new CreateAuthorSerieUseCase(
  databaseAuthorSerieRepository
);
const createAuthorSerieController = new CreateAuthorSerieController(
  createAuthorSerieUseCase
);

const deleteAuthorSerieUseCase = new DeleteAuthorSerieUseCase(
  databaseAuthorSerieRepository
);
const deleteAuthorSerieController = new DeleteAuthorSerieController(
  deleteAuthorSerieUseCase
);

const updateAuthorSerieUseCase = new UpdateAuthorSerieUseCase(
  databaseAuthorSerieRepository
);
const updateAuthorSerieController = new UpdateAuthorSerieController(
  updateAuthorSerieUseCase
);

export {
  getAuthorSerieController,
  getAuthorSerieUseCase,
  createAuthorSerieController,
  createAuthorSerieUseCase,
  deleteAuthorSerieController,
  deleteAuthorSerieUseCase,
  updateAuthorSerieController,
  updateAuthorSerieUseCase,
  databaseAuthorSerieRepository,
};
