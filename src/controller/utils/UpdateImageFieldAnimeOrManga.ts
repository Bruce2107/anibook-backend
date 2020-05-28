import { QueryResult } from 'pg';
import { AnimeData } from '../../constants/types/AnimeType';
import { MangaData } from '../../constants/types/MangaType';
import { pool } from '../../database';
import saveImages from '../../utils/SaveImageOnDatabase';

const updateImageField = async (
  name: string,
  folder: string,
  files: Express.Multer.File[],
  table: string
) => {
  if (!files || !folder) return 422;

  const exists: QueryResult<
    AnimeData | MangaData
  > = await pool.query(
    `SELECT dados FROM ${table} WHERE dados ->> 'name' = $1`,
    [name]
  );
  if (!exists.rowCount) {
    return 404;
  }

  exists.rows[0].dados.folder = folder as string;
  if (!exists.rows[0].dados.images) exists.rows[0].dados.images = [];
  files.forEach((file) => {
    if (!(exists.rows[0].dados.images.indexOf(file.originalname) >= 0)) {
      exists.rows[0].dados.images.push(file.originalname);
    }
  });

  await saveImages(folder as string, undefined, files);

  await pool.query(
    `UPDATE ${table} SET dados = $1 WHERE dados ->> 'name' = $2`,
    [exists.rows[0].dados, name]
  );
  return 204;
};

export default updateImageField;
