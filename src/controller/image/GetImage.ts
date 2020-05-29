import { Request, Response } from 'express';
import { mongoConnection } from '../../database';
import { TypeImage } from '../../constants/types/ImageType';

const getImage = async (request: Request, response: Response) => {
  try {
    const { folder, name } = request.params;
    
    const connection = await mongoConnection('anibook');
    const result = await connection
      .collection<TypeImage>('images')
      .findOne({ folder, name });
    if(result){
      response.contentType(result.contentType)
      return response.send(result.image.buffer)
    }
    return response.sendStatus(404)
  } catch (error) {
    return response.status(400).send({ error: error.stack });
  }
};

export default getImage;
