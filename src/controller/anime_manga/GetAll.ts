import { Request, Response } from 'express';
import { Dados } from '../../constants/Data';
import getAll from '../utils/GetAllAnimesOrManga';

async function getAllAnimes<T>(
  request: Request,
  response: Response
): Promise<Response<Array<T>>> {
  try {
    const { limit } = request.query;
    const table = request.path.split('/')[1];

    const result = await getAll<Dados<T>>(limit as string, table);

    return response
      .status(result.status)
      .json({ data: result.data, rows: result.rows });
  } catch (error) {
    return response.status(400).send({ error: error.stack });
  }
}

export default getAllAnimes;
