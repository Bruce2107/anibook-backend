import { CreateImageController } from './CreateImageController';
import { CreateImageUseCase } from './CreateImageUseCase';
import { databaseImageRepository } from '..';

const createImageUseCase = new CreateImageUseCase(databaseImageRepository);

const createImageController = new CreateImageController(createImageUseCase);

export { createImageController, createImageUseCase };
