import { Request, Response } from 'express';
import { mongoConnection } from '../../database';
import { TypeImage } from '../../constants/types/ImageType';

const getRandomBackground = async (request: Request, response: Response<ArrayBuffer | SharedArrayBuffer | Object>) => {
  try {
    const { limit } = request.query;
    const size = Number(limit) || 1;
    
    const connection = await mongoConnection('anibook');
    const randomRow = await connection
      .collection<TypeImage>('images')
      .aggregate([{ $match: { folder: 'background' } }, { $sample: { size } }])
      .toArray();
    if(!randomRow[0])
      return response.sendStatus(404)
    response.contentType(randomRow[0].contentType);
    return response.send(randomRow[0].image.buffer);
  } catch (error) {
    return response.status(400).send({ error: error.stack });
  }
};

export default getRandomBackground;
