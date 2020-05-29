import { QueryResult } from 'pg';
import { Card } from '../../constants/types/DataType';
import { pool } from '../../database';

const getCardInformationsByName = async (
  name: string,
  table: string
): Promise<{ status: number; data?: Card }> => {
  const result: QueryResult<Card> = await pool.query(
    `SELECT dados ->> 'folder' as folder, dados ->> 'photo' as photo, dados ->> 'name' as name FROM ${table} WHERE dados ->> 'name' = $1`,
    [name]
  );

  return result.rowCount
    ? { status: 200, data: result.rows[0] }
    : { status: 404 };
};

export default getCardInformationsByName;
