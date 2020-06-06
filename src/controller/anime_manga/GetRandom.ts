import { Request, Response } from 'express';
import { Dados } from 'anibook';
import getRandomAnimeOrManga from '../utils/GetAllAnimesOrManga';

async function getAll<T>(
  request: Request,
  response: Response
): Promise<Response<Array<T>>> {
  try {
    const { limit } = request.query;
    
    // Get the database table from path request
    const table = request.path.split('/')[1];

    const result = await getRandomAnimeOrManga<Dados<T>>(limit as string, table);

    return response
      .status(result.status)
      .json({ data: result.data, rows: result.rows });
  } catch (error) {
    return response.status(400).send({ error: error.stack });
  }
}

export default getAll;
