import { CreateStudioUseCase, CreateStudioController } from './CreateStudio';
import { GetStudioController, GetStudioUseCase } from './GetStudio';
import { DeleteStudioUseCase, DeleteStudioController } from './DeleteStudio';
import { UpdateStudioUseCase, UpdateStudioController } from './UpdateStudio';
import { StudioRepositoryRelationalImpl } from '@adapter/udesc/studio/StudioRelationalImpl';
import { GetAllStudiosUseCase, GetAllStudiosController } from './GetAllStudios';

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
};
