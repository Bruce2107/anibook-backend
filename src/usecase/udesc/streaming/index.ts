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

const databaseStreamingRepository = new StreamingRepositoryRelationalImpl();

const getStreamingUseCase = new GetStreamingUseCase(
  databaseStreamingRepository
);
const getStreamingController = new GetStreamingController(getStreamingUseCase);

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
};
