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
};
