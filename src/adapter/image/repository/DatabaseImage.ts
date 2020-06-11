import pgp from 'pg-promise';
import { QueryResult } from 'pg';
import ImageRepository from '../../../usecase/port/ImageRepository';
import { pool, promisePool } from '../../../database';
import Image from '../../../domain/image';

export default class DatabaseImage implements ImageRepository {

  async _delete(folder: string, name: string): Promise<boolean> {
    const deleted: QueryResult = await pool.query(
      `DELETE FROM images WHERE name = $1 AND folder = $2`,
      [name, folder]
    );

    return !!deleted.rowCount;
  }

  async alreadyExists(folder: string, name: string): Promise<boolean> {
    const exists = await pool.query(
      `SELECT * FROM images WHERE name = $1 AND folder = $2 LIMIT 1`,
      [name, folder]
    );

    return !!exists.rowCount;
  }

  async getBackground(): Promise<Pick<Image, 'contentType' | 'image'>> {
    const result: QueryResult<Pick<
      Image,
      'contentType' | 'image'
    >> = await pool.query(
      `SELECT "contentType", "image" FROM images WHERE folder = 'background' ORDER BY random () LIMIT 1`,
      []
    );
    return result.rows[0];
  }

  async getOne(
    folder: string,
    name: string
  ): Promise<Pick<Image, 'contentType' | 'image'>> {
    const result: QueryResult<Pick<
      Image,
      'contentType' | 'image'
    >> = await pool.query(
      `SELECT "contentType", "image" FROM images WHERE name = $1 AND folder = $2 LIMIT 1`,
      [name, folder]
    );

    return result.rows[0];
  }

  async insertMany(images: Image[]): Promise<[boolean, number]> {
    const pg = await promisePool();
    const query = pgp().helpers.insert(
      images,
      ['name', 'folder', 'contentType', 'image'],
      'images'
    );
    await pg.none(query);
    return [true, images.length];
  }

  async insertOne(image: Image): Promise<boolean> {
    const inserted: QueryResult = await pool.query(
      `INSERT INTO images (name,folder,"contentType",image) VALUES ($1,$2,$3,$4)`,
      [image.name, image.folder, image.contentType, image.image]
    );

    return !!inserted.rowCount;
  }
}
