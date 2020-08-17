import { GetImageController } from './GetImageController';
import { GetImageUseCase } from './GetImageUseCase';
import { databaseImageRepository } from '../..';

const getImageUseCase = new GetImageUseCase(databaseImageRepository);

const getImageController = new GetImageController(getImageUseCase);

export { getImageController, getImageUseCase };
