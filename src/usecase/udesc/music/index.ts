import { CreateMusicUseCase, CreateMusicController } from './CreateMusic';
import { GetMusicController, GetMusicUseCase } from './GetMusic';
import { DeleteMusicUseCase, DeleteMusicController } from './DeleteMusic';
import { UpdateMusicUseCase, UpdateMusicController } from './UpdateMusic';
import { MusicRepositoryRelationalImpl } from '@adapter/udesc/music/MusicRelationalImpl';
import { GetAllMusicsUseCase, GetAllMusicsController } from './GetAllMusics';
import { MusicRepositoryGraphImpl } from '@adapter/udesc/music/MusicRepositoryGraphImpl';

const databaseMusicRepository = new MusicRepositoryRelationalImpl();

const getMusicUseCase = new GetMusicUseCase(databaseMusicRepository);
const getMusicController = new GetMusicController(getMusicUseCase);

const getAllMusicsUseCase = new GetAllMusicsUseCase(databaseMusicRepository);
const getAllMusicsController = new GetAllMusicsController(getAllMusicsUseCase);

const createMusicUseCase = new CreateMusicUseCase(databaseMusicRepository);
const createMusicController = new CreateMusicController(createMusicUseCase);

const deleteMusicUseCase = new DeleteMusicUseCase(databaseMusicRepository);
const deleteMusicController = new DeleteMusicController(deleteMusicUseCase);

const updateMusicUseCase = new UpdateMusicUseCase(databaseMusicRepository);
const updateMusicController = new UpdateMusicController(updateMusicUseCase);

const databaseMusicGraphRepository = new MusicRepositoryGraphImpl();

const getMusicGraphUseCase = new GetMusicUseCase(databaseMusicGraphRepository);
const getMusicGraphController = new GetMusicController(getMusicGraphUseCase);

const getAllMusicsGraphUseCase = new GetAllMusicsUseCase(
  databaseMusicGraphRepository
);
const getAllMusicsGraphController = new GetAllMusicsController(
  getAllMusicsGraphUseCase
);

const createMusicGraphUseCase = new CreateMusicUseCase(
  databaseMusicGraphRepository
);
const createMusicGraphController = new CreateMusicController(
  createMusicGraphUseCase
);

const deleteMusicGraphUseCase = new DeleteMusicUseCase(
  databaseMusicGraphRepository
);
const deleteMusicGraphController = new DeleteMusicController(
  deleteMusicGraphUseCase
);

const updateMusicGraphUseCase = new UpdateMusicUseCase(
  databaseMusicGraphRepository
);
const updateMusicGraphController = new UpdateMusicController(
  updateMusicGraphUseCase
);

export {
  getMusicController,
  getMusicUseCase,
  createMusicController,
  createMusicUseCase,
  deleteMusicController,
  deleteMusicUseCase,
  updateMusicController,
  updateMusicUseCase,
  databaseMusicRepository,
  getAllMusicsController,
  getMusicGraphController,
  getAllMusicsGraphController,
  createMusicGraphController,
  deleteMusicGraphController,
  updateMusicGraphController,
};
