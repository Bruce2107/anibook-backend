import { QueryResult } from 'pg';
import { Anime } from '../../constants/types/AnimeType';
import { Manga } from '../../constants/types/MangaType';
import { pool } from '../../database';
import saveImages from '../../utils/SaveImageOnDatabase';

const create = async (
  folder: string,
  dados: Anime | Manga,
  files: { [fieldname: string]: Express.Multer.File[] },
  table: string
) => {
  if (Object.keys(files).length) {
    if (!folder) return 422;
    dados.folder = folder;
    if (Object.keys(files).includes('card')) {
      const card: Express.Multer.File = files['card'][0];
      dados.photo = card.originalname;
      await saveImages(folder as string, card, undefined);
    }
    if (Object.keys(files).includes('images')) {
      const images: Express.Multer.File[] = files['images'];
      dados.images = images.map((image) => image.originalname);
      await saveImages(folder as string, undefined, images);
    }
  }

  const exists: QueryResult<typeof dados> = await pool.query(
    `SELECT id FROM ${table} WHERE dados ->> 'name' = $1`,
    [dados.name]
  );

  if (exists.rowCount) return 409;

  await pool.query(`INSERT INTO ${table} (dados) VALUES ($1)`, [dados]);
  return 201;
};

export default create;
