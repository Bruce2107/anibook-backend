import { Request, Response } from 'express';
import { pool } from '../../database';
import { AnimeData } from '../../constants/types/AnimeType';
import { QueryResult } from 'pg';
const updatePhoto = async (request: Request, response: Response) => {
  try {
    const { name } = request.params;
    const { folder } = request.query;
    const file = request.file;

    const anime: QueryResult<AnimeData> = await pool.query(
      `SELECT dados FROM animes WHERE dados ->> 'name' = $1`,
      [name]
    );
    if (!anime.rowCount) {
      response.status(404).json({ message: `${name} não encontrado` });
    }
    anime.rows[0].dados.folder = folder as string;
    anime.rows[0].dados.photo = file.originalname;

    const result = await pool.query(
      `UPDATE animes SET dados = $1 WHERE dados ->> 'name' = $2`,
      [anime.rows[0].dados, name]
    );
    response
      .status(200)
      .json({
        message: 'success',
        data: anime.rows[0].dados,
        rows: result.rowCount,
      });
  } catch (error) {
    response.status(400).json({ error });
  }
};

export default updatePhoto;
