import {
  CreateLanguageUseCase,
  CreateLanguageController,
} from './CreateLanguage';
import { GetLanguageController, GetLanguageUseCase } from './GetLanguage';
import {
  DeleteLanguageUseCase,
  DeleteLanguageController,
} from './DeleteLanguage';
import {
  UpdateLanguageUseCase,
  UpdateLanguageController,
} from './UpdateLanguage';
import { LanguageRepositoryRelationalImpl } from '@adapter/udesc/language/LanguageRelationalImpl';
import {
  GetAllLanguagesUseCase,
  GetAllLanguagesController,
} from './GetAllLanguages';
import { LanguageRepositoryGraphImpl } from '@adapter/udesc/language/LanguageRepositoryGraphImpl';

const databaseLanguageRepository = new LanguageRepositoryRelationalImpl();

const getLanguageUseCase = new GetLanguageUseCase(databaseLanguageRepository);
const getLanguageController = new GetLanguageController(getLanguageUseCase);

const getAllLanguagesUseCase = new GetAllLanguagesUseCase(
  databaseLanguageRepository
);
const getAllLanguagesController = new GetAllLanguagesController(
  getAllLanguagesUseCase
);

const createLanguageUseCase = new CreateLanguageUseCase(
  databaseLanguageRepository
);
const createLanguageController = new CreateLanguageController(
  createLanguageUseCase
);

const deleteLanguageUseCase = new DeleteLanguageUseCase(
  databaseLanguageRepository
);
const deleteLanguageController = new DeleteLanguageController(
  deleteLanguageUseCase
);

const updateLanguageUseCase = new UpdateLanguageUseCase(
  databaseLanguageRepository
);
const updateLanguageController = new UpdateLanguageController(
  updateLanguageUseCase
);

const databaseLanguageGraphRepository = new LanguageRepositoryGraphImpl();

const getLanguageGraphUseCase = new GetLanguageUseCase(
  databaseLanguageGraphRepository
);
const getLanguageGraphController = new GetLanguageController(
  getLanguageGraphUseCase
);

const getAllLanguagesGraphUseCase = new GetAllLanguagesUseCase(
  databaseLanguageGraphRepository
);
const getAllLanguagesGraphController = new GetAllLanguagesController(
  getAllLanguagesGraphUseCase
);

const createLanguageGraphUseCase = new CreateLanguageUseCase(
  databaseLanguageGraphRepository
);
const createLanguageGraphController = new CreateLanguageController(
  createLanguageGraphUseCase
);

const deleteLanguageGraphUseCase = new DeleteLanguageUseCase(
  databaseLanguageGraphRepository
);
const deleteLanguageGraphController = new DeleteLanguageController(
  deleteLanguageGraphUseCase
);

const updateLanguageGraphUseCase = new UpdateLanguageUseCase(
  databaseLanguageGraphRepository
);
const updateLanguageGraphController = new UpdateLanguageController(
  updateLanguageGraphUseCase
);

export {
  getLanguageController,
  getLanguageUseCase,
  createLanguageController,
  createLanguageUseCase,
  deleteLanguageController,
  deleteLanguageUseCase,
  updateLanguageController,
  updateLanguageUseCase,
  databaseLanguageRepository,
  getAllLanguagesController,
  getAllLanguagesUseCase,
  getAllLanguagesGraphController,
  getAllLanguagesGraphUseCase,
  createLanguageGraphController,
  createLanguageGraphUseCase,
  deleteLanguageGraphController,
  deleteLanguageGraphUseCase,
  updateLanguageGraphController,
  updateLanguageGraphUseCase,
  getLanguageGraphController,
  getLanguageGraphUseCase,
};
