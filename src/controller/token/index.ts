import { Request, Response } from 'express';
import { IToken } from '../../@types/anibook-backend';
import { User } from 'anibook';
import { alreadyExists, insert, get } from '../../database/token';
import createToken from '../../utils/CreateToken';

class Token implements IToken {
  async createUser(request: Request, response: Response): Promise<Response> {
    try {
      const { email, nickname } = request.body as User;

      if (!email || !nickname) return response.sendStatus(422);

      if (await alreadyExists(email, nickname)) return response.sendStatus(409);

      await insert(email, nickname);

      const token = createToken({ email, nickname });

      return response.status(201).send({ token });
    } catch (error) {
      return response.status(400).json(error);
    }
  }
  
  async getToken(request: Request, response: Response): Promise<Response> {
    try {
      const { nickname } = request.params;

      const user = await get(nickname);

      if (!user.rowCount) return response.sendStatus(404);

      const token = createToken({
        email: user.rows[0].email,
        nickname: user.rows[0].nickname,
      });

      return response.status(200).send({ token });
    } catch (error) {
      return response.status(400).json(error);
    }
  }
}

export default new Token();
