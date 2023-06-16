import {
  CreateImageUseCase,
  CreateImageController,
  CreateImageGraphController,
  CreateImageGraphUseCase,
} from './CreateImage';
import { GetImageController, GetImageUseCase } from './GetImage';
import {
  DeleteImageUseCase,
  DeleteImageController,
  DeleteImageGraphController,
  DeleteImageGraphUseCase,
} from './DeleteImage';
import { ImageRelationalRepositoryImpl } from '@adapter/udesc/image/ImageRelationalRepositoryImpl';
import { UpdateImageUseCase, UpdateImageController } from './UpdateImage';
import { ImageRepositoryGraphImpl } from '@adapter/udesc/image/ImageRepositoryGraphImpl';

const databaseImageRepository = new ImageRelationalRepositoryImpl();

const getImageUseCase = new GetImageUseCase(databaseImageRepository);
const getImageController = new GetImageController(getImageUseCase);

const createImageUseCase = new CreateImageUseCase(databaseImageRepository);
const createImageController = new CreateImageController(createImageUseCase);

const deleteImageUseCase = new DeleteImageUseCase(databaseImageRepository);
const deleteImageController = new DeleteImageController(deleteImageUseCase);

const updateImageUseCase = new UpdateImageUseCase(databaseImageRepository);
const updateImageController = new UpdateImageController(updateImageUseCase);

const databaseImageGraphRepository = new ImageRepositoryGraphImpl();

const getImageGraphUseCase = new GetImageUseCase(databaseImageGraphRepository);
const getImageGraphController = new GetImageController(getImageGraphUseCase);

const createImageGraphUseCase = new CreateImageGraphUseCase(
  databaseImageGraphRepository
);
const createImageGraphController = new CreateImageGraphController(
  createImageGraphUseCase
);

const deleteImageGraphUseCase = new DeleteImageGraphUseCase(
  databaseImageGraphRepository
);
const deleteImageGraphController = new DeleteImageGraphController(
  deleteImageGraphUseCase
);

const updateImageGraphUseCase = new UpdateImageUseCase(
  databaseImageGraphRepository
);
const updateImageGraphController = new UpdateImageController(
  updateImageGraphUseCase
);

export {
  getImageController,
  getImageUseCase,
  createImageController,
  createImageUseCase,
  deleteImageController,
  deleteImageUseCase,
  databaseImageRepository,
  updateImageController,
  getImageGraphController,
  getImageGraphUseCase,
  createImageGraphController,
  createImageGraphUseCase,
  deleteImageGraphController,
  deleteImageGraphUseCase,
  updateImageGraphController,
};
