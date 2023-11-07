import { UserRepository } from '@adapter/udesc/user/UserRepository';
import { User } from '@domain/udesc/user';
import { Request, Response } from 'express';

export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const data = new User(request.body);

      const user = await this.updateUserUseCase.execute(id, data);

      return response.sendStatus(user ? 204 : 404);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute(id: string, data: User) {
    const result = await this.userRepository.updateUser(id, data);
    return result;
  }
}
