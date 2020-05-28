import { QueryResult } from 'pg';
import { AnimeData } from '../../constants/types/AnimeType';
import { pool } from '../../database';
import saveImages from '../../utils/SaveImageOnDatabase';

const updatePhoto = async (
  name: string,
  folder: string,
  file: Express.Multer.File,
  table: string
) => {
  if (!file || !folder) return 422;

  const exists: QueryResult<AnimeData> = await pool.query(
    `SELECT dados FROM ${table} WHERE dados ->> 'name' = $1`,
    [name]
  );

  if (!exists.rowCount) return 404;

  exists.rows[0].dados.folder = folder as string;
  exists.rows[0].dados.photo = file.originalname;

  await saveImages(folder as string, file, undefined);

  await pool.query(
    `UPDATE ${table} SET dados = $1 WHERE dados ->> 'name' = $2`,
    [exists.rows[0].dados, name]
  );
  return 204;
};

export default updatePhoto;
