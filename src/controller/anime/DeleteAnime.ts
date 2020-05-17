import { Request, Response } from 'express';
import { pool } from '../../database';
import { QueryResult } from 'pg';

const deleteAnime = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const { name } = request.params;
    const exists: QueryResult = await pool.query(
      `SELECT id FROM animes WHERE dados ->> 'name' = $1`,
      [name]
    );
    if (exists.rowCount) {
      const result: QueryResult = await pool.query(
        `DELETE FROM animes WHERE dados ->> 'name' = $1`,
        [name]
      );
      return response
        .status(200)
        .json({ rows: result.rowCount, message: 'deleted' });
    } else {
      return response.status(404).json({ message: `${name} não encontrado` });
    }
  } catch (error) {
    return response.status(400).json({ error });
  }
};

export default deleteAnime;
