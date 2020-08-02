import { CreateUserController } from './CreateUserController';
import { CreateUserUseCase } from './CreateUserUseCase';
import { databaseUserRepository } from '..';

const createUserUseCase = new CreateUserUseCase(databaseUserRepository);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserController, createUserUseCase };
