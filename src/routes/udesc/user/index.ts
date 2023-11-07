import { Router, Request, Response } from 'express';
import {
  // createUserController,
  createUserGraphController,
  // deleteUserController,
  deleteUserGraphController,
  // getAllUsersController,
  getAllUsersGraphController,
  // getUserController,
  getUserGraphController,
  // updateUserController,
  updateUserGraphController,
} from '@usecase/udesc/user';

const routes = Router();

// routes.get('/user/:id', (req: Request, res: Response) =>
//   getUserController.handle(req, res)
// );

// routes.get('/users', (req: Request, res: Response) =>
//   getAllUsersController.handle(req, res)
// );

// routes.post('/user', (req: Request, res: Response) =>
//   createUserController.handle(req, res)
// );

// routes.patch('/user/:id', (req: Request, res: Response) =>
//   updateUserController.handle(req, res)
// );

// routes.delete('/user/:id', (req: Request, res: Response) =>
//   deleteUserController.handle(req, res)
// );

routes.get('/graph/user/:id', (req: Request, res: Response) =>
  getUserGraphController.handle(req, res)
);

routes.get('/graph/users', (req: Request, res: Response) =>
  getAllUsersGraphController.handle(req, res)
);

routes.post('/graph/user', (req: Request, res: Response) =>
  createUserGraphController.handle(req, res)
);

routes.patch('/graph/user/:id', (req: Request, res: Response) =>
  updateUserGraphController.handle(req, res)
);

routes.delete('/graph/user/:id', (req: Request, res: Response) =>
  deleteUserGraphController.handle(req, res)
);

export default routes;
