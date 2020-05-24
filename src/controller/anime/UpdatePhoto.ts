import { Request, Response } from 'express';
import { pool } from '../../database';
import { AnimeData } from '../../constants/types/AnimeType';
import { QueryResult } from 'pg';
import saveImages from '../../utils/SaveImageOnDatabase';

const updatePhoto = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const { name } = request.params;
    const { folder } = request.query;
    const file = request.file;
    if (!file) {
      return response.sendStatus(422);
    }
    const anime: QueryResult<AnimeData> = await pool.query(
      `SELECT dados FROM animes WHERE dados ->> 'name' = $1`,
      [name]
    );
    if (!anime.rowCount) {
      return response.sendStatus(404);
    }
    anime.rows[0].dados.folder = folder as string;
    anime.rows[0].dados.photo = file.originalname;

    await saveImages(folder as string, file, undefined);

    await pool.query(
      `UPDATE animes SET dados = $1 WHERE dados ->> 'name' = $2`,
      [anime.rows[0].dados, name]
    );
    return response.sendStatus(204);
  } catch (error) {
    return response.status(400).json({ error });
  }
};

export default updatePhoto;
