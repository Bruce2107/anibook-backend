import { QueryResult } from 'pg';
import { Anime } from '../../constants/types/AnimeType';
import { Manga } from '../../constants/types/MangaType';
import { pool } from '../../database';

const _delete = async (name: string, table: string) => {
  const exists: QueryResult<Anime | Manga> = await pool.query(
    `SELECT id FROM ${table} WHERE dados ->> 'name' = $1`,
    [name]
  );
  if (!exists.rowCount) return 404;

  await pool.query(`DELETE FROM ${table} WHERE dados ->> 'name' = $1`, [name]);
  return 204;
};

export default _delete;
