import { Request, Response } from 'express';
import { _delete } from '../../database/image';

const deleteImage = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const { folder, name } = request.params;

    return (await _delete(folder, name))
      ? response.sendStatus(204)
      : response.sendStatus(404);
  } catch (error) {
    return response.status(400).send({ error: error.stack });
  }
};

export default deleteImage;
