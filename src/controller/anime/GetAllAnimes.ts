import { Request, Response } from 'express';
import { Anime } from '../../constants/types/AnimeType';
import getAll from '../utils/GetAllAnimesOrManga';

const getAllAnimes = async (
  request: Request,
  response: Response
): Promise<Response<Array<Anime>>> => {
  try {
    const { limit } = request.query;
    const result = await getAll(limit as string, 'animes');

    return response
      .status(result.status)
      .json({ data: result.data, rows: result.rows });
  } catch (error) {
    return response.status(400).send({ error: error.stack });
  }
};

export default getAllAnimes;
