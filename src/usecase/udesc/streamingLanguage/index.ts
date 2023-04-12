import {
  CreateStreamingLanguageUseCase,
  CreateStreamingLanguageController,
} from './CreateStreamingLanguage';
import {
  GetStreamingLanguageController,
  GetStreamingLanguageUseCase,
} from './GetStreamingLanguage';
import {
  DeleteStreamingLanguageUseCase,
  DeleteStreamingLanguageController,
} from './DeleteStreamingLanguage';
import {
  UpdateStreamingLanguageUseCase,
  UpdateStreamingLanguageController,
} from './UpdateStreamingLanguage';
import { StreamingLanguageRepositoryRelationalImpl } from '@adapter/udesc/streamingLanguage/StreamingLanguageRepositoryRelationalImpl';

const databaseStreamingLanguageRepository = new StreamingLanguageRepositoryRelationalImpl();

const getStreamingLanguageUseCase = new GetStreamingLanguageUseCase(
  databaseStreamingLanguageRepository
);
const getStreamingLanguageController = new GetStreamingLanguageController(
  getStreamingLanguageUseCase
);

const createStreamingLanguageUseCase = new CreateStreamingLanguageUseCase(
  databaseStreamingLanguageRepository
);
const createStreamingLanguageController = new CreateStreamingLanguageController(
  createStreamingLanguageUseCase
);

const deleteStreamingLanguageUseCase = new DeleteStreamingLanguageUseCase(
  databaseStreamingLanguageRepository
);
const deleteStreamingLanguageController = new DeleteStreamingLanguageController(
  deleteStreamingLanguageUseCase
);

const updateStreamingLanguageUseCase = new UpdateStreamingLanguageUseCase(
  databaseStreamingLanguageRepository
);
const updateStreamingLanguageController = new UpdateStreamingLanguageController(
  updateStreamingLanguageUseCase
);

export {
  getStreamingLanguageController,
  getStreamingLanguageUseCase,
  createStreamingLanguageController,
  createStreamingLanguageUseCase,
  deleteStreamingLanguageController,
  deleteStreamingLanguageUseCase,
  updateStreamingLanguageController,
  updateStreamingLanguageUseCase,
  databaseStreamingLanguageRepository,
};
