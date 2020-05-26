import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../../database';
import { Anime, AnimeData } from 'src/constants/types/AnimeType';

const getAllAnimes = async (
  request: Request,
  response: Response
): Promise<Response<Array<Anime>>> => {
  try {
    const { limit } = request.query;
    const result: QueryResult<AnimeData> = await pool.query(
      'SELECT dados FROM animes ORDER BY random () LIMIT $1',
      [limit]
    );
    return response
      .status(200)
      .json({ data: result.rows, rows: result.rowCount });
  } catch (error) {
    return response.status(400).send({ error: error.stack });
  }
};

export default getAllAnimes;
