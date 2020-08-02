import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';
import { User } from '@domain/user';
import { createToken } from '@utils/CreateToken';

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { email, nickname } = request.body as User;

      if (!email || !nickname) return response.sendStatus(422);

      const result = await this.createUserUseCase.execute(email, nickname);

      if (result) {
        const token = createToken({ email, nickname });
        return response.status(201).send({ token });
      } else {
        return response.sendStatus(409);
      }
    } catch (error) {
      return response.status(400).send({ error: error.stack });
    }
  }
}
