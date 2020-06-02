import { Request, Response } from 'express';
import { TypeImage } from 'anibook';
import { mongoConnection } from '../../database';

const deleteImage = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const { folder, name } = request.params;

    const connection = await mongoConnection('anibook');
    const result = await connection
      .collection<TypeImage>('images')
      .findOneAndDelete({ folder, name });

    return result.value ? response.sendStatus(204) : response.sendStatus(404);
  } catch (error) {
    return response.status(400).send({ error: error.stack });
  }
};

export default deleteImage;
