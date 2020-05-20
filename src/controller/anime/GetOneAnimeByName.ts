import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../../database';
import { AnimeData } from 'src/constants/types/AnimeType';

const GetOneByName = async (
  request: Request,
  response: Response
): Promise<Response<AnimeData>> => {
  try {
    const { name } = request.params;
    const result: QueryResult<AnimeData> = await pool.query(
      `SELECT dados FROM animes WHERE dados ->> 'name' = $1`,
      [name]
    );
    return result.rowCount
      ? response
          .status(200)
          .json({ data: result.rows[0].dados, message: 'success' })
      : response.status(404).json({ message: `${name} não encontrado` });
  } catch (error) {
    return response.status(400).json({ error });
  }
};

export default GetOneByName;
