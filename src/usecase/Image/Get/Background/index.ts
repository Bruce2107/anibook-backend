import { GetBackgroundController } from './GetBackgroundController';
import { GetBackgroundUseCase } from './GetBackgroundUseCase';
import { databaseImageRepository } from '../..';

const getBackgroundUseCase = new GetBackgroundUseCase(databaseImageRepository);

const getBackgroundController = new GetBackgroundController(
  getBackgroundUseCase
);

export { getBackgroundController, getBackgroundUseCase };
