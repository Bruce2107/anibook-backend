import { Request, Response } from 'express';
import { pool } from '../../database';
import { QueryResult } from 'pg';
import { Card } from '../../constants/types/DataType';

const GetRandomCardInformations = async (
  request: Request,
  response: Response
): Promise<Response<Array<Card>>> => {
  try {
    const { limit } = request.query;
    const result: QueryResult<Array<
      Card
    >> = await pool.query(
      `SELECT dados ->> 'folder' as folder, dados ->> 'photo' as image, dados ->> 'name' as name FROM animes ORDER BY random() LIMIT $1`,
      [limit]
    );
    return result.rowCount
      ? response.status(200).json({
          data: result.rows,
          rows: result.rowCount,
          message: 'success',
        })
      : response.status(404).json({ message: 'nenhum anime encontrado' });
  } catch (error) {
    return response.status(400).json({ error });
  }
};

export default GetRandomCardInformations;