import { Request, Response } from 'express';
import { pool } from '../../database';
import { Anime } from '../../constants/types/AnimeType';
import { QueryResult } from 'pg';

const createAnime = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const dados: Anime = request.body.dados;
    const exists: QueryResult = await pool.query(
      `SELECT id FROM animes WHERE dados ->> 'name' = $1`,
      [dados.name]
    );
    if (!exists.rowCount) {
      const result: QueryResult = await pool.query(
        'INSERT INTO animes (dados) VALUES ($1)',
        [dados]
      );
      return response
        .status(201)
        .json({ rows: result.rowCount, message: 'created' });
    } else {
      return response
        .status(403)
        .json({ message: `${dados.name} já está registrado` });
    }
  } catch (error) {
    return response.status(400).json({ error });
  }
};

export default createAnime;
