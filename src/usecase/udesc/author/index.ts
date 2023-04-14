import { CreateAuthorUseCase, CreateAuthorController } from './CreateAuthor';
import { GetAuthorController, GetAuthorUseCase } from './GetAuthor';
import { DeleteAuthorUseCase, DeleteAuthorController } from './DeleteAuthor';
import { UpdateAuthorUseCase, UpdateAuthorController } from './UpdateAuthor';
import { AuthorRepositoryRelationalImpl } from '@adapter/udesc/author/AuthorRepositoryRelationalImpl';
import { GetAllAuthorsController, GetAllAuthorsUseCase } from './GetAllAuthors';

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
};
