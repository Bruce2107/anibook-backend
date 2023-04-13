import { ReportRepositoryRelationalImpl } from '@adapter/udesc/report/ReportRepositoryRelationalImpl';
import {
  GetSerieStudioUseCase,
  GetSerieStudioController,
} from './GetSerieStudio';
import { GetSerieMusicUseCase, GetSerieMusicController } from './GetSerieMusic';
import {
  GetSerieStreamingController,
  GetSerieStreamingUseCase,
} from './GetSerieStreaming';

const databaseReportRepository = new ReportRepositoryRelationalImpl();

const getSerieStudioUseCase = new GetSerieStudioUseCase(
  databaseReportRepository
);
const getSerieStudioController = new GetSerieStudioController(
  getSerieStudioUseCase
);

const getSerieMusicUseCase = new GetSerieMusicUseCase(databaseReportRepository);
const getSerieMusicController = new GetSerieMusicController(
  getSerieMusicUseCase
);

const getSerieStreamingUseCase = new GetSerieStreamingUseCase(
  databaseReportRepository
);
const getSerieStreamingController = new GetSerieStreamingController(
  getSerieStreamingUseCase
);

export {
  getSerieStudioUseCase,
  getSerieStudioController,
  databaseReportRepository,
  getSerieMusicController,
  getSerieMusicUseCase,
  getSerieStreamingController,
  getSerieStreamingUseCase,
};
