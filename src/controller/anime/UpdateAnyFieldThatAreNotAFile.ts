import { Request, Response } from 'express';
import { pool } from '../../database';
import { AnimeData } from '../../constants/types/AnimeType';

const updateAnyFieldThatAreNotAFile = async (
  request: Request,
  response: Response
) => {
  try {
    const dados: AnimeData = JSON.parse(request.body.dados);
    const { name } = request.params;
    const anime = await pool.query(
      `SELECT dados FROM animes WHERE dados ->> 'name' = $1`,
      [name]
    );

    if (!anime) {
      return response.status(404).json({ message: `${name} não encontrado` });
    }

    return response.status(200).json({ abc: dados });
  } catch (error) {
    return response.status(400).json({ error });
  }
};

export default updateAnyFieldThatAreNotAFile;
