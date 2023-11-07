import { UserRepository } from '@adapter/udesc/user/UserRepository';
import { User } from '@domain/udesc/user';
import { Request, Response } from 'express';

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body as User;

      if (!name || !email || !password) return response.sendStatus(422);

      const result = await this.createUserUseCase.execute({
        name,
        email,
        password,
      });
      return response.sendStatus(result ? 201 : 409);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute({ ...user }: User) {
    return await this.userRepository.insertOne(new User(user));
  }
}
