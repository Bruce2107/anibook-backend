import { GetUserController } from './GetUserController';
import { GetUserUseCase } from './GetUserUseCase';
import { databaseUserRepository } from '..';

const getUserUseCase = new GetUserUseCase(databaseUserRepository);

const getUserController = new GetUserController(getUserUseCase);

export { getUserController, getUserUseCase };
