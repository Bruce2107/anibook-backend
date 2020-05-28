import { QueryResult } from 'pg';
import { Card } from '../../constants/types/DataType';
import { pool } from '../../database';

const getRandomCard = async (limit: string, table: string) => {
  const result: QueryResult<Array<
    Card
  >> = await pool.query(
    `SELECT dados ->> 'folder' as folder, dados ->> 'photo' as photo, dados ->> 'name' as name FROM ${table} ORDER BY random() LIMIT $1`,
    [limit]
  );
  return {
    status: 200,
    data: result.rows,
    rows: result.rowCount,
  };
};

export default getRandomCard;
