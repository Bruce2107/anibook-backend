import { QueryResult } from 'pg';
import { AnimeData } from '../../constants/types/AnimeType';
import { MangaData } from '../../constants/types/MangaType';
import { pool } from '../../database';

const getByName = async (
  name: string,
  table: string
): Promise<{ status: number; data?: AnimeData | MangaData }> => {
  const result: QueryResult<
    AnimeData | MangaData
  > = await pool.query(
    `SELECT dados FROM ${table} WHERE dados ->> 'name' = $1`,
    [name]
  );
  return result.rowCount
    ? { status: 200, data: result.rows[0] }
    : { status: 404 };
};

export default getByName;
