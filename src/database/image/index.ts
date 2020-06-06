import { TypeImage } from 'anibook';
import { pool, promisePool } from '../';
import { QueryResult } from 'pg';
import pgp from 'pg-promise';

export async function alreadyExists(
  folder: string,
  name: string
): Promise<boolean> {
  const exists = await pool.query(
    `SELECT * FROM images WHERE name = $1 AND folder = $2 LIMIT 1`,
    [name, folder]
  );

  return !!exists.rowCount;
}

export async function insertOne(image: TypeImage): Promise<boolean> {
  const inserted: QueryResult = await pool.query(
    `INSERT INTO images (name,folder,"contentType",image) VALUES ($1,$2,$3,$4)`,
    [image.name, image.folder, image.contentType, image.image]
  );

  return !!inserted.rowCount;
}

export async function insertMany(images: TypeImage[]) {
  const pg = await promisePool();
  const query = pgp().helpers.insert(
    images,
    ['name', 'folder', 'contentType', 'image'],
    'images'
  );
  await pg.none(query);
}

export async function get(
  folder: string,
  name: string
): Promise<QueryResult<Pick<TypeImage, 'contentType' | 'image'>>> {
  return await pool.query(
    `SELECT "contentType", "image" FROM images WHERE name = $1 AND folder = $2 LIMIT 1`,
    [name, folder]
  );
}

export async function _delete(folder: string, name: string): Promise<boolean> {
  const deleted: QueryResult = await pool.query(
    `DELETE FROM images WHERE name = $1 AND folder = $2`,
    [name, folder]
  );

  return !!deleted;
}

export async function getBackground(): Promise<
  QueryResult<Pick<TypeImage, 'contentType' | 'image'>>
> {
  return await pool.query(
    `SELECT "contentType", "image" FROM images WHERE folder = 'background' ORDER BY random () LIMIT 1`,
    []
  );
}
