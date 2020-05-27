import { Request, Response } from 'express';
import { mongoConnection } from '../../database';
import { TypeImage } from '../../constants/types/ImageType';

const deleteImage = async (request: Request, response: Response) => {
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
