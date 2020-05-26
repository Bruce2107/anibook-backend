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
      await pool.query(`DELETE FROM animes WHERE dados ->> 'name' = $1`, [
        name,
      ]);
      return response.sendStatus(204);
    } else {
      return response.sendStatus(404);
    }
  } catch (error) {
    return response.status(400).send({ error: error.stack });
  }
};

export default deleteAnime;
