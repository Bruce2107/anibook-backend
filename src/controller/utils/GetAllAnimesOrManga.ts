import { QueryResult } from 'pg';
import { AnimeData } from 'src/constants/types/AnimeType';
import { MangaData } from 'src/constants/types/MangaType';
import { pool } from '../../database';

const getAll = async (limit: string, table: string) => {
  const result: QueryResult<
    AnimeData | MangaData
  > = await pool.query(
    `SELECT dados FROM ${table} ORDER BY random () LIMIT $1`,
    [limit]
  );
  return {
    status: 200,
    data: result.rows,
    rows: result.rowCount,
  };
};

export default getAll;
