import { Request, Response } from 'express';
import { TypeImage } from 'anibook';
import { mongoConnection } from '../../database';

const getRandomBackground = async (
  _: Request,
  response: Response<ArrayBuffer | SharedArrayBuffer | Object>
) => {
  try {
    const size = 1;

    const connection = await mongoConnection('anibook');
    const randomRow = await connection
      .collection<TypeImage>('images')
      .aggregate([{ $match: { folder: 'background' } }, { $sample: { size } }])
      .toArray();
    if (!randomRow[0]) return response.sendStatus(404);
    response.contentType(randomRow[0].contentType);
    return response.send(randomRow[0].image.buffer);
  } catch (error) {
    return response.status(400).send({ error: error.stack });
  }
};

export default getRandomBackground;
