import { Request, Response } from 'express';
import { User } from 'anibook';
import createToken from '../../utils/CreateToken';
import { alreadyExists, insert } from '../../database/token';

const createUser = async (
  request: Request,
  response: Response
): Promise<Response> => {
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
};

export default createUser;
