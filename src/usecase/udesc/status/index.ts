import { CreateStatusUseCase, CreateStatusController } from './CreateStatus';
import { GetStatusController, GetStatusUseCase } from './GetStatus';
import { DeleteStatusUseCase, DeleteStatusController } from './DeleteStatus';
import { UpdateStatusUseCase, UpdateStatusController } from './UpdateStatus';
import { StatusRepositoryRelationalImpl } from '@adapter/udesc/status/StatusRelationalImpl';
import { GetAllStatusUseCase, GetAllStatusController } from './GetAllStatus';
import { StatusRepositoryGraphImpl } from '@adapter/udesc/status/StatusRepositoryGraphImpl';

const databaseStatusRepository = new StatusRepositoryRelationalImpl();

const getStatusUseCase = new GetStatusUseCase(databaseStatusRepository);
const getStatusController = new GetStatusController(getStatusUseCase);

const getAllStatusUseCase = new GetAllStatusUseCase(databaseStatusRepository);
const getAllStatusController = new GetAllStatusController(getAllStatusUseCase);

const createStatusUseCase = new CreateStatusUseCase(databaseStatusRepository);
const createStatusController = new CreateStatusController(createStatusUseCase);

const deleteStatusUseCase = new DeleteStatusUseCase(databaseStatusRepository);
const deleteStatusController = new DeleteStatusController(deleteStatusUseCase);

const updateStatusUseCase = new UpdateStatusUseCase(databaseStatusRepository);
const updateStatusController = new UpdateStatusController(updateStatusUseCase);

const databaseStatusGraphRepository = new StatusRepositoryGraphImpl();

const getStatusGraphUseCase = new GetStatusUseCase(
  databaseStatusGraphRepository
);
const getStatusGraphController = new GetStatusController(getStatusGraphUseCase);

const getAllStatusGraphUseCase = new GetAllStatusUseCase(
  databaseStatusGraphRepository
);
const getAllStatusGraphController = new GetAllStatusController(
  getAllStatusGraphUseCase
);

const createStatusGraphUseCase = new CreateStatusUseCase(
  databaseStatusGraphRepository
);
const createStatusGraphController = new CreateStatusController(
  createStatusGraphUseCase
);

const deleteStatusGraphUseCase = new DeleteStatusUseCase(
  databaseStatusGraphRepository
);
const deleteStatusGraphController = new DeleteStatusController(
  deleteStatusGraphUseCase
);

const updateStatusGraphUseCase = new UpdateStatusUseCase(
  databaseStatusGraphRepository
);
const updateStatusGraphController = new UpdateStatusController(
  updateStatusGraphUseCase
);

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
  getAllStatusController,
  getStatusGraphController,
  getAllStatusGraphController,
  createStatusGraphController,
  deleteStatusGraphController,
  updateStatusGraphController,
};
