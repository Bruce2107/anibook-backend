import { CreateMusicUseCase, CreateMusicController } from './CreateMusic';
import { GetMusicController, GetMusicUseCase } from './GetMusic';
import { DeleteMusicUseCase, DeleteMusicController } from './DeleteMusic';
import { UpdateMusicUseCase, UpdateMusicController } from './UpdateMusic';
import { MusicRepositoryRelationalImpl } from '@adapter/udesc/music/MusicRelationalImpl';

const databaseMusicRepository = new MusicRepositoryRelationalImpl();

const getMusicUseCase = new GetMusicUseCase(databaseMusicRepository);
const getMusicController = new GetMusicController(getMusicUseCase);

const createMusicUseCase = new CreateMusicUseCase(databaseMusicRepository);
const createMusicController = new CreateMusicController(createMusicUseCase);

const deleteMusicUseCase = new DeleteMusicUseCase(databaseMusicRepository);
const deleteMusicController = new DeleteMusicController(deleteMusicUseCase);

const updateMusicUseCase = new UpdateMusicUseCase(databaseMusicRepository);
const updateMusicController = new UpdateMusicController(updateMusicUseCase);

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
};
