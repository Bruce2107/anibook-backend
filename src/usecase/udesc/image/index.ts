import { CreateImageUseCase, CreateImageController } from './CreateImage';
import { GetImageController, GetImageUseCase } from './GetImage';
import { DeleteImageUseCase, DeleteImageController } from './DeleteImage';
import { ImageRelationalRepositoryImpl } from '@adapter/udesc/image/ImageRelationalRepositoryImpl';
import { UpdateImageUseCase, UpdateImageController } from './UpdateImage';

const databaseImageRepository = new ImageRelationalRepositoryImpl();

const getImageUseCase = new GetImageUseCase(databaseImageRepository);
const getImageController = new GetImageController(getImageUseCase);

const createImageUseCase = new CreateImageUseCase(databaseImageRepository);
const createImageController = new CreateImageController(createImageUseCase);

const deleteImageUseCase = new DeleteImageUseCase(databaseImageRepository);
const deleteImageController = new DeleteImageController(deleteImageUseCase);

const updateImageUseCase = new UpdateImageUseCase(databaseImageRepository);
const updateImageController = new UpdateImageController(updateImageUseCase);

export {
  getImageController,
  getImageUseCase,
  createImageController,
  createImageUseCase,
  deleteImageController,
  deleteImageUseCase,
  databaseImageRepository,
  updateImageController,
};
