import { Request, Response } from 'express';
import { pool } from '../../database';
import { AnimeData } from '../../constants/types/AnimeType';
import { QueryResult } from 'pg';
import saveImages from '../../utils/SaveImageOnDatabase';

const updateImageField = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const { name } = request.params;
    const { folder } = request.query;
    const files = request.files as Express.Multer.File[];

    if (!files) {
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

    files.forEach((file) => {
      if(!(anime.rows[0].dados.images.indexOf(file.originalname) >= 0)){
        anime.rows[0].dados.images.push(file.originalname)
      }
    })
    
    await saveImages(folder as string, undefined, files);
    
    await pool.query(
      `UPDATE animes SET dados = $1 WHERE dados ->> 'name' = $2`,
      [anime.rows[0].dados, name]
    );
    return response.sendStatus(204);
  } catch (error) {
    return response.status(400).send({ error: error.stack });
  }
};

export default updateImageField;
