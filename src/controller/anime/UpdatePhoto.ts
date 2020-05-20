import { Request, Response } from 'express';
import { pool } from '../../database';
import { AnimeData } from '../../constants/types/AnimeType';
import { QueryResult } from 'pg';
const updatePhoto = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const { name } = request.params;
    const { folder } = request.query;
    const file = request.file;
    if(!file){
      return response.status(422).json({message: 'Arquivo faltando'});
    }
    const anime: QueryResult<AnimeData> = await pool.query(
      `SELECT dados FROM animes WHERE dados ->> 'name' = $1`,
      [name]
    );
    if (!anime.rowCount) {
      return response.status(404).json({ message: `${name} não encontrado` });
    }
    anime.rows[0].dados.folder = folder as string;
    anime.rows[0].dados.photo = file.originalname;

    const result = await pool.query(
      `UPDATE animes SET dados = $1 WHERE dados ->> 'name' = $2`,
      [anime.rows[0].dados, name]
    );
    return response.status(200).json({
      message: 'success',
      data: anime.rows[0].dados,
      rows: result.rowCount,
    });
  } catch (error) {
    return response.status(400).json({ error });
  }
};

export default updatePhoto;
