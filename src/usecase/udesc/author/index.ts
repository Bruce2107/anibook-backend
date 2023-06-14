import { CreateAuthorUseCase, CreateAuthorController } from './CreateAuthor';
import { GetAuthorController, GetAuthorUseCase } from './GetAuthor';
import { DeleteAuthorUseCase, DeleteAuthorController } from './DeleteAuthor';
import { UpdateAuthorUseCase, UpdateAuthorController } from './UpdateAuthor';
import { AuthorRepositoryRelationalImpl } from '@adapter/udesc/author/AuthorRepositoryRelationalImpl';
import { GetAllAuthorsController, GetAllAuthorsUseCase } from './GetAllAuthors';
import { AuthorRepositoryGraphImpl } from '@adapter/udesc/author/AuthorRepositoryGraphImpl';

const databaseAuthorRepository = new AuthorRepositoryRelationalImpl();

const getAuthorUseCase = new GetAuthorUseCase(databaseAuthorRepository);
const getAuthorController = new GetAuthorController(getAuthorUseCase);

const getAllAuthorsUseCase = new GetAllAuthorsUseCase(databaseAuthorRepository);
const getAllAuthorsController = new GetAllAuthorsController(
  getAllAuthorsUseCase
);

const createAuthorUseCase = new CreateAuthorUseCase(databaseAuthorRepository);
const createAuthorController = new CreateAuthorController(createAuthorUseCase);

const deleteAuthorUseCase = new DeleteAuthorUseCase(databaseAuthorRepository);
const deleteAuthorController = new DeleteAuthorController(deleteAuthorUseCase);

const updateAuthorUseCase = new UpdateAuthorUseCase(databaseAuthorRepository);
const updateAuthorController = new UpdateAuthorController(updateAuthorUseCase);

const databaseAuthorGraphRepository = new AuthorRepositoryGraphImpl();

const getAuthorGraphUseCase = new GetAuthorUseCase(
  databaseAuthorGraphRepository
);
const getAuthorGraphController = new GetAuthorController(getAuthorGraphUseCase);

const getAllAuthorsGraphUseCase = new GetAllAuthorsUseCase(
  databaseAuthorGraphRepository
);
const getAllAuthorsGraphController = new GetAllAuthorsController(
  getAllAuthorsGraphUseCase
);

const createAuthorGraphUseCase = new CreateAuthorUseCase(
  databaseAuthorGraphRepository
);
const createAuthorGraphController = new CreateAuthorController(
  createAuthorGraphUseCase
);

const deleteAuthorGraphUseCase = new DeleteAuthorUseCase(
  databaseAuthorGraphRepository
);
const deleteAuthorGraphController = new DeleteAuthorController(
  deleteAuthorGraphUseCase
);

const updateAuthorGraphUseCase = new UpdateAuthorUseCase(
  databaseAuthorGraphRepository
);
const updateAuthorGraphController = new UpdateAuthorController(
  updateAuthorGraphUseCase
);

export {
  getAuthorController,
  getAuthorUseCase,
  createAuthorController,
  createAuthorUseCase,
  deleteAuthorController,
  deleteAuthorUseCase,
  updateAuthorController,
  updateAuthorUseCase,
  databaseAuthorRepository,
  getAllAuthorsController,
  getAllAuthorsUseCase,
  getAuthorGraphController,
  getAuthorGraphUseCase,
  getAllAuthorsGraphController,
  getAllAuthorsGraphUseCase,
  createAuthorGraphController,
  createAuthorGraphUseCase,
  deleteAuthorGraphController,
  deleteAuthorGraphUseCase,
  updateAuthorGraphController,
  updateAuthorGraphUseCase,
};
