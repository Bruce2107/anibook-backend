import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../../database';
import { Anime } from 'src/constants/types/AnimeType';

const getAllAnimes = async (request: Request, response: Response) => {
  const res: QueryResult<Anime> = await pool.query('SELECT dados FROM animes');
  return response.status(200).json({ dada: res.rows, rows: res.rowCount });
};

export default getAllAnimes;
