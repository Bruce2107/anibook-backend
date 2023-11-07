import { CreateUserUseCase, CreateUserController } from './CreateUser';
import { GetUserController, GetUserUseCase } from './GetUser';
import { DeleteUserUseCase, DeleteUserController } from './DeleteUser';
import { UpdateUserUseCase, UpdateUserController } from './UpdateUser';
// import { UserRepositoryRelationalImpl } from '@adapter/udesc/studio/UserRelationalImpl';
import { GetAllUsersUseCase, GetAllUsersController } from './GetAllUsers';
import { UserRepositoryGraphImpl } from '@adapter/udesc/user/UserRepositoryGraphImpl';

// const databaseUserRepository = new UserRepositoryRelationalImpl();

// const getUserUseCase = new GetUserUseCase(databaseUserRepository);
// const getUserController = new GetUserController(getUserUseCase);

// const getAllUsersUseCase = new GetAllUsersUseCase(databaseUserRepository);
// const getAllUsersController = new GetAllUsersController(
//   getAllUsersUseCase
// );

// const createUserUseCase = new CreateUserUseCase(databaseUserRepository);
// const createUserController = new CreateUserController(createUserUseCase);

// const deleteUserUseCase = new DeleteUserUseCase(databaseUserRepository);
// const deleteUserController = new DeleteUserController(deleteUserUseCase);

// const updateUserUseCase = new UpdateUserUseCase(databaseUserRepository);
// const updateUserController = new UpdateUserController(updateUserUseCase);

const databaseUserGraphRepository = new UserRepositoryGraphImpl();

const getUserGraphUseCase = new GetUserUseCase(databaseUserGraphRepository);
const getUserGraphController = new GetUserController(getUserGraphUseCase);

const getAllUsersGraphUseCase = new GetAllUsersUseCase(
  databaseUserGraphRepository
);
const getAllUsersGraphController = new GetAllUsersController(
  getAllUsersGraphUseCase
);

const createUserGraphUseCase = new CreateUserUseCase(
  databaseUserGraphRepository
);
const createUserGraphController = new CreateUserController(
  createUserGraphUseCase
);

const deleteUserGraphUseCase = new DeleteUserUseCase(
  databaseUserGraphRepository
);
const deleteUserGraphController = new DeleteUserController(
  deleteUserGraphUseCase
);

const updateUserGraphUseCase = new UpdateUserUseCase(
  databaseUserGraphRepository
);
const updateUserGraphController = new UpdateUserController(
  updateUserGraphUseCase
);

export {
  // getUserController,
  // getUserUseCase,
  // createUserController,
  // createUserUseCase,
  // deleteUserController,
  // deleteUserUseCase,
  // updateUserController,
  // updateUserUseCase,
  // databaseUserRepository,
  // getAllUsersController,
  // getAllUsersUseCase,
  getAllUsersGraphController,
  getUserGraphController,
  getUserGraphUseCase,
  createUserGraphController,
  createUserGraphUseCase,
  deleteUserGraphController,
  deleteUserGraphUseCase,
  updateUserGraphController,
  updateUserGraphUseCase,
};
