import {
  CreateStreamingUseCase,
  CreateStreamingController,
} from './CreateStreaming';
import { GetStreamingController, GetStreamingUseCase } from './GetStreaming';
import {
  DeleteStreamingUseCase,
  DeleteStreamingController,
} from './DeleteStreaming';
import {
  UpdateStreamingUseCase,
  UpdateStreamingController,
} from './UpdateStreaming';
import { StreamingRepositoryRelationalImpl } from '@adapter/udesc/streaming/StreamingRelationalImpl';
import {
  GetAllStreamingsUseCase,
  GetAllStreamingsController,
} from './GetAllStreamings';
import { StreamingRepositoryGraphImpl } from '@adapter/udesc/streaming/StreamingRepositoryGraphImpl';

const databaseStreamingRepository = new StreamingRepositoryRelationalImpl();

const getStreamingUseCase = new GetStreamingUseCase(
  databaseStreamingRepository
);
const getStreamingController = new GetStreamingController(getStreamingUseCase);

const getAllStreamingsUseCase = new GetAllStreamingsUseCase(
  databaseStreamingRepository
);
const getAllStreamingsController = new GetAllStreamingsController(
  getAllStreamingsUseCase
);

const createStreamingUseCase = new CreateStreamingUseCase(
  databaseStreamingRepository
);
const createStreamingController = new CreateStreamingController(
  createStreamingUseCase
);

const deleteStreamingUseCase = new DeleteStreamingUseCase(
  databaseStreamingRepository
);
const deleteStreamingController = new DeleteStreamingController(
  deleteStreamingUseCase
);

const updateStreamingUseCase = new UpdateStreamingUseCase(
  databaseStreamingRepository
);
const updateStreamingController = new UpdateStreamingController(
  updateStreamingUseCase
);

const databaseStreamingGraphRepository = new StreamingRepositoryGraphImpl();

const getStreamingGraphUseCase = new GetStreamingUseCase(
  databaseStreamingGraphRepository
);
const getStreamingGraphController = new GetStreamingController(
  getStreamingGraphUseCase
);

const getAllStreamingsGraphUseCase = new GetAllStreamingsUseCase(
  databaseStreamingGraphRepository
);
const getAllStreamingsGraphController = new GetAllStreamingsController(
  getAllStreamingsGraphUseCase
);

const createStreamingGraphUseCase = new CreateStreamingUseCase(
  databaseStreamingGraphRepository
);
const createStreamingGraphController = new CreateStreamingController(
  createStreamingGraphUseCase
);

const deleteStreamingGraphUseCase = new DeleteStreamingUseCase(
  databaseStreamingGraphRepository
);
const deleteStreamingGraphController = new DeleteStreamingController(
  deleteStreamingGraphUseCase
);

const updateStreamingGraphUseCase = new UpdateStreamingUseCase(
  databaseStreamingGraphRepository
);
const updateStreamingGraphController = new UpdateStreamingController(
  updateStreamingGraphUseCase
);

export {
  getStreamingController,
  getStreamingUseCase,
  createStreamingController,
  createStreamingUseCase,
  deleteStreamingController,
  deleteStreamingUseCase,
  updateStreamingController,
  updateStreamingUseCase,
  databaseStreamingRepository,
  getAllStreamingsController,
  getStreamingGraphController,
  getAllStreamingsGraphController,
  createStreamingGraphController,
  deleteStreamingGraphController,
  updateStreamingGraphController,
};
