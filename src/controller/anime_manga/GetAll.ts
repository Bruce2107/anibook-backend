import { Request, Response } from 'express';
import { Anime, AnimeData } from '../../constants/types/AnimeType';
import getAll from '../utils/GetAllAnimesOrManga';

const getAllAnimes = async (
  request: Request,
  response: Response
): Promise<Response<Array<Anime>>> => {
  try {
    const { limit } = request.query;
    const table = request.path.split('/')[1];

    const result = await getAll<AnimeData>(limit as string, table);

    return response
      .status(result.status)
      .json({ data: result.data, rows: result.rows });
  } catch (error) {
    return response.status(400).send({ error: error.stack });
  }
};

export default getAllAnimes;
