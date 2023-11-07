import { UserRepository } from '@adapter/udesc/user/UserRepository';
import { Request, Response } from 'express';

export class GetUserController {
  constructor(private getUserUseCase: GetUserUseCase) {}
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const user = await this.getUserUseCase.execute(id);

      if (!user) return response.sendStatus(404);
      return response.status(200).json({ user });
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute(id: string) {
    return isNaN(Number(id))
      ? this.userRepository.getUser(id)
      : this.userRepository.getUserById(id);
  }
}
