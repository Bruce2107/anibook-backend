import { UserRepository } from '@adapter/udesc/user/UserRepository';
import { Request, Response } from 'express';

export class GetAllUsersController {
  constructor(private getAllUsersUseCase: GetAllUsersUseCase) {}
  async handle(_: Request, response: Response) {
    try {
      const users = await this.getAllUsersUseCase.execute();

      return response.status(200).json({ users });
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
export class GetAllUsersUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute() {
    return this.userRepository.getAllUsers();
  }
}
