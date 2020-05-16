import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../../database';
import { Anime } from 'src/constants/types/AnimeType';

const GetOneByName = async (
  request: Request,
  response: Response
): Promise<Response<Anime>> => {
  try {
    const { name } = request.params;
    const result: QueryResult<Array<
      Anime
    >> = await pool.query(
      `SELECT dados FROM animes WHERE dados ->> 'name' = $1`,
      [name]
    );
    return result.rowCount
      ? response.status(200).json({ data: result.rows[0], message: 'success' })
      : response.status(404).json({ message: 'anime não encontrado' });
  } catch (error) {
    return response.status(400).json({ error });
  }
};

export default GetOneByName;
