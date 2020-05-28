import { QueryResult } from 'pg';
import { pool } from '../../database';

const _delete = async (name: string, table: string) => {
  const exists: QueryResult = await pool.query(
    `SELECT id FROM ${table} WHERE dados ->> 'name' = $1`,
    [name]
  );
  if (!exists.rowCount) return 404;

  await pool.query(`DELETE FROM ${table} WHERE dados ->> 'name' = $1`, [name]);
  return 204;
};

export default _delete;
