import { Request, Response } from 'express';
import createToken from '../../utils/CreateToken';
import { get } from '../../database/token';

const getToken = async (
  request: Request,
  response: Response
): Promise<Response> => {
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
};

export default getToken;
