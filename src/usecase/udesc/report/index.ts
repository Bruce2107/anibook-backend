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
import { ReportRepositoryGraphImpl } from '@adapter/udesc/report/ReportRepositoryGraphImpl';
import { GetHomeController, GetHomeUseCase } from './GetHome';

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

const databaseReportGraphRepository = new ReportRepositoryGraphImpl();

const getSerieStudioGraphUseCase = new GetSerieStudioUseCase(
  databaseReportRepository
);
const getSerieStudioGraphController = new GetSerieStudioController(
  getSerieStudioGraphUseCase
);

const getSerieMusicGraphUseCase = new GetSerieMusicUseCase(
  databaseReportGraphRepository
);
const getSerieMusicGraphController = new GetSerieMusicController(
  getSerieMusicGraphUseCase
);

const getSerieStreamingGraphUseCase = new GetSerieStreamingUseCase(
  databaseReportGraphRepository
);
const getSerieStreamingGraphController = new GetSerieStreamingController(
  getSerieStreamingGraphUseCase
);
const getHomeGraphUseCase = new GetHomeUseCase(databaseReportGraphRepository);
const getHomeGraphController = new GetHomeController(getHomeGraphUseCase);

export {
  getSerieStudioUseCase,
  getSerieStudioController,
  databaseReportRepository,
  getSerieMusicController,
  getSerieMusicUseCase,
  getSerieStreamingController,
  getSerieStreamingUseCase,
  getSerieStudioGraphController,
  getSerieStudioGraphUseCase,
  getSerieMusicGraphController,
  getSerieMusicGraphUseCase,
  getSerieStreamingGraphController,
  getSerieStreamingGraphUseCase,
  getHomeGraphController,
};
