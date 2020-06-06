import { Request, Response } from 'express';
import { get } from '../../database/image';

const getImage = async (request: Request, response: Response) => {
  try {
    const { folder, name } = request.params;

    const result = await get(folder, name);
    if (result.rowCount) {
      response.contentType(result.rows[0].contentType);
      return response.send(result.rows[0].image);
    }
    return response.sendStatus(404);
  } catch (error) {
    return response.status(400).send({ error: error.stack });
  }
};

export default getImage;
