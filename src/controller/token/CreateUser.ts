import { Request, Response } from 'express';
import createToken from '../../utils/CreateToken';
import { mongoConnection } from '../../database';
import { User } from '../../constants/types/TokenType';

const createUser = async (request: Request, response: Response): Promise<Response> => {
  try {
    const { email, nickname } = request.body as User;

    if (!email || !nickname) return response.sendStatus(422);

    const connection = await mongoConnection('anibook');

    const dbemail = await connection.collection<User>('users').findOne({ email });
    const dbnickname = await connection
      .collection<User>('users')
      .findOne({ nickname });

    if (dbemail || dbnickname) return response.sendStatus(409);

    await connection.collection('users').insertOne({ email, nickname });

    const token = createToken({ email, nickname });

    return response.status(201).send({ token });
  } catch (error) {
    return response.status(400).json(error);
  }
};

export default createUser;
