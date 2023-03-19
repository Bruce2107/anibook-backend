import { Request, Response } from 'express';
import { GetUserUseCase } from './GetUserUseCase';
import { createToken } from '@utils/CreateToken';

export class GetUserController {
  constructor(private getUserUseCase: GetUserUseCase) {}
  async handle(request: Request, response: Response) {
    try {
      const { nickname } = request.params;

      const user = await this.getUserUseCase.execute(nickname);

      if (!user) return response.sendStatus(404);

      const token = createToken({
        email: user.email,
        nickname: user.nickname,
      });

      return response.status(200).json({ token });
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
