import { Request, Response } from 'express';
import { getBackground } from '../../database/image';

const getRandomBackground = async (
  _: Request,
  response: Response<ArrayBuffer | SharedArrayBuffer | Object>
) => {
  try {
    const randomRow = await getBackground();
    if (!randomRow.rowCount) return response.sendStatus(404);
    response.contentType(randomRow.rows[0].contentType);
    return response.send(randomRow.rows[0].image);
  } catch (error) {
    return response.status(400).send({ error: error.stack });
  }
};

export default getRandomBackground;
