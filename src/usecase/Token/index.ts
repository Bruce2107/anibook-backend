import { Request, Response } from 'express';
import { User } from 'anibook';
import { createToken } from '@utils/CreateToken';
import { TokenControllerRepository } from '@usecase/port/TokenControllerRepository';
import { DatabaseToken } from '@adapter/token/repository/DatabaseToken';

export class TokenController implements TokenControllerRepository {
  async createUser(request: Request, response: Response): Promise<Response> {
    const tokenAdapter = new DatabaseToken();
    try {
      const { email, nickname } = request.body as User;

      if (!email || !nickname) return response.sendStatus(422);

      if (await tokenAdapter.alreadyExists(email, nickname))
        return response.sendStatus(409);

      await tokenAdapter.insertOne(email, nickname);

      const token = createToken({ email, nickname });

      return response.status(201).send({ token });
    } catch (error) {
      return response.status(400).json(error);
    }
  }

  async getToken(request: Request, response: Response): Promise<Response> {
    const tokenAdapter = new DatabaseToken();
    try {
      const { nickname } = request.params;

      const user = await tokenAdapter.getOne(nickname);

      if (!user) return response.sendStatus(404);

      const token = createToken({
        email: user.email,
        nickname: user.nickname,
      });

      return response.status(200).send({ token });
    } catch (error) {
      return response.status(400).json(error);
    }
  }
}
