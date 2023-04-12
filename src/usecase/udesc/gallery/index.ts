import { CreateGalleryUseCase, CreateGalleryController } from './CreateGallery';
import { GetGalleryController, GetGalleryUseCase } from './GetGallery';
import { DeleteGalleryUseCase, DeleteGalleryController } from './DeleteGallery';
import { UpdateGalleryUseCase, UpdateGalleryController } from './UpdateGallery';
import { GalleryRepositoryRelationalImpl } from '@adapter/udesc/gallery/GalleryRelationalImpl';

const databaseGalleryRepository = new GalleryRepositoryRelationalImpl();

const getGalleryUseCase = new GetGalleryUseCase(databaseGalleryRepository);
const getGalleryController = new GetGalleryController(getGalleryUseCase);

const createGalleryUseCase = new CreateGalleryUseCase(
  databaseGalleryRepository
);
const createGalleryController = new CreateGalleryController(
  createGalleryUseCase
);

const deleteGalleryUseCase = new DeleteGalleryUseCase(
  databaseGalleryRepository
);
const deleteGalleryController = new DeleteGalleryController(
  deleteGalleryUseCase
);

const updateGalleryUseCase = new UpdateGalleryUseCase(
  databaseGalleryRepository
);
const updateGalleryController = new UpdateGalleryController(
  updateGalleryUseCase
);

export {
  getGalleryController,
  getGalleryUseCase,
  createGalleryController,
  createGalleryUseCase,
  deleteGalleryController,
  deleteGalleryUseCase,
  updateGalleryController,
  updateGalleryUseCase,
  databaseGalleryRepository,
};
