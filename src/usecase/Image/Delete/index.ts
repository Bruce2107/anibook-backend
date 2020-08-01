import { DeleteImageController } from './DeleteImageController';
import { DeleteImageUseCase } from './DeleteImageUseCase';
import { databaseImageRepository } from '..';

const deleteImageUseCase = new DeleteImageUseCase(databaseImageRepository);

const deleteImageController = new DeleteImageController(deleteImageUseCase);

export { deleteImageController, deleteImageUseCase };
