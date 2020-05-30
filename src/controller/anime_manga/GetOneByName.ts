import { Request, Response } from 'express';
import { Dados } from '../../constants/Data';
import getByName from '../utils/GetOneAnimeOrMangaByName';

async function GetOneByName<T>(
  request: Request,
  response: Response
): Promise<Response<T>> {
  try {
    const { name } = request.params;
    const table = request.path.split('/')[1];

    const result = await getByName<Dados<T>>(name, table);
    return response.status(result.status).json({ data: result.data?.dados });
  } catch (error) {
    return response.status(400).send({ error: error.stack });
  }
}

export default GetOneByName;
