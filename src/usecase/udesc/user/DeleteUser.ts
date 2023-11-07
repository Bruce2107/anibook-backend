import { UserRepository } from '@adapter/udesc/user/UserRepository';
import { Request, Response } from 'express';

export class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      return (await this.deleteUserUseCase.execute(id))
        ? response.sendStatus(204)
        : response.sendStatus(404);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string) {
    return this.userRepository._delete(id);
  }
}
