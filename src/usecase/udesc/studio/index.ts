import { CreateStudioUseCase, CreateStudioController } from './CreateStudio';
import { GetStudioController, GetStudioUseCase } from './GetStudio';
import { DeleteStudioUseCase, DeleteStudioController } from './DeleteStudio';
import { UpdateStudioUseCase, UpdateStudioController } from './UpdateStudio';
import { StudioRepositoryRelationalImpl } from '@adapter/udesc/studio/StudioRelationalImpl';
import { GetAllStudiosUseCase, GetAllStudiosController } from './GetAllStudios';
import { StudioRepositoryGraphImpl } from '@adapter/udesc/studio/StudioRepositoryGraphImpl';

const databaseStudioRepository = new StudioRepositoryRelationalImpl();

const getStudioUseCase = new GetStudioUseCase(databaseStudioRepository);
const getStudioController = new GetStudioController(getStudioUseCase);

const getAllStudiosUseCase = new GetAllStudiosUseCase(databaseStudioRepository);
const getAllStudiosController = new GetAllStudiosController(
  getAllStudiosUseCase
);

const createStudioUseCase = new CreateStudioUseCase(databaseStudioRepository);
const createStudioController = new CreateStudioController(createStudioUseCase);

const deleteStudioUseCase = new DeleteStudioUseCase(databaseStudioRepository);
const deleteStudioController = new DeleteStudioController(deleteStudioUseCase);

const updateStudioUseCase = new UpdateStudioUseCase(databaseStudioRepository);
const updateStudioController = new UpdateStudioController(updateStudioUseCase);

const databaseStudioGraphRepository = new StudioRepositoryGraphImpl();

const getStudioGraphUseCase = new GetStudioUseCase(
  databaseStudioGraphRepository
);
const getStudioGraphController = new GetStudioController(getStudioGraphUseCase);

const getAllStudiosGraphUseCase = new GetAllStudiosUseCase(
  databaseStudioGraphRepository
);
const getAllStudiosGraphController = new GetAllStudiosController(
  getAllStudiosGraphUseCase
);

const createStudioGraphUseCase = new CreateStudioUseCase(
  databaseStudioGraphRepository
);
const createStudioGraphController = new CreateStudioController(
  createStudioGraphUseCase
);

const deleteStudioGraphUseCase = new DeleteStudioUseCase(
  databaseStudioGraphRepository
);
const deleteStudioGraphController = new DeleteStudioController(
  deleteStudioGraphUseCase
);

const updateStudioGraphUseCase = new UpdateStudioUseCase(
  databaseStudioRepository
);
const updateStudioGraphController = new UpdateStudioController(
  updateStudioGraphUseCase
);

export {
  getStudioController,
  getStudioUseCase,
  createStudioController,
  createStudioUseCase,
  deleteStudioController,
  deleteStudioUseCase,
  updateStudioController,
  updateStudioUseCase,
  databaseStudioRepository,
  getAllStudiosController,
  getAllStudiosUseCase,
  getAllStudiosGraphController,
  getStudioGraphController,
  getStudioGraphUseCase,
  createStudioGraphController,
  createStudioGraphUseCase,
  deleteStudioGraphController,
  deleteStudioGraphUseCase,
  updateStudioGraphController,
  updateStudioGraphUseCase,
};
