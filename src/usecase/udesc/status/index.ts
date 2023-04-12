import { CreateStatusUseCase, CreateStatusController } from './CreateStatus';
import { GetStatusController, GetStatusUseCase } from './GetStatus';
import { DeleteStatusUseCase, DeleteStatusController } from './DeleteStatus';
import { UpdateStatusUseCase, UpdateStatusController } from './UpdateStatus';
import { StatusRepositoryRelationalImpl } from '@adapter/udesc/status/StatusRelationalImpl';

const databaseStatusRepository = new StatusRepositoryRelationalImpl();

const getStatusUseCase = new GetStatusUseCase(databaseStatusRepository);
const getStatusController = new GetStatusController(getStatusUseCase);

const createStatusUseCase = new CreateStatusUseCase(databaseStatusRepository);
const createStatusController = new CreateStatusController(createStatusUseCase);

const deleteStatusUseCase = new DeleteStatusUseCase(databaseStatusRepository);
const deleteStatusController = new DeleteStatusController(deleteStatusUseCase);

const updateStatusUseCase = new UpdateStatusUseCase(databaseStatusRepository);
const updateStatusController = new UpdateStatusController(updateStatusUseCase);

export {
  getStatusController,
  getStatusUseCase,
  createStatusController,
  createStatusUseCase,
  deleteStatusController,
  deleteStatusUseCase,
  updateStatusController,
  updateStatusUseCase,
  databaseStatusRepository,
};
