import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../../database';
import { Card } from 'src/constants/types/DataType';

const getCardInformtionsByName = async (
  request: Request,
  response: Response
): Promise<Response<Card>> => {
  try {
    const { name } = request.params;
    const result: QueryResult<Card> = await pool.query(
      `SELECT dados ->> 'folder' as folder, dados ->> 'photo' as image, dados ->> 'name' as name FROM animes WHERE dados ->> 'name' = $1`,
      [name]
    );
    return result.rowCount
      ? response.status(200).json({ data: result.rows[0], message: 'success' })
      : response.status(404).json({ message: 'anime não encontrado' });
  } catch (error) {
    return response.status(400).json({ error });
  }
};

export default getCardInformtionsByName;