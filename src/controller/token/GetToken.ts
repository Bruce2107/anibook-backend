import { Request, Response } from 'express';
import { User } from 'anibook';
import createToken from '../../utils/CreateToken';
import { mongoConnection } from '../../database';

const getToken = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const { nickname } = request.params;

    const connection = await mongoConnection('anibook');

    const user = await connection
      .collection<User>('users')
      .findOne({ nickname });

    if (!user) return response.sendStatus(404);

    const token = createToken({ email: user.email, nickname });

    return response.status(200).send({ token });
  } catch (error) {
    return response.status(400).json(error);
  }
};

export default getToken;
