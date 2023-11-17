import { UserRepository } from '@adapter/udesc/user/UserRepository';
import { Request, Response } from 'express';

type UserStatusBody = {
  username: string;
  serie: string;
  value: string;
};

export class UpdateUserStatusController {
  constructor(private updateUserUseCase: UpdateUserStatusUseCase) {}
  async handle(request: Request, response: Response) {
    try {
      const { username, serie, value } = request.body as UserStatusBody;
      if (!username || !serie || !value) return response.sendStatus(422);
      const user = await this.updateUserUseCase.execute(username, serie, value);

      return response.sendStatus(user ? 204 : 404);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}

export class UpdateUserStatusUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute(username: string, serie: string, value: string) {
    const result = await this.userRepository.changeStatus(
      username,
      serie,
      value
    );
    return result;
  }
}
