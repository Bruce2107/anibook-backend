import pgp from 'pg-promise';
import { QueryResult } from 'pg';
import { pool, promisePool } from '../../../database';
import { Image } from '@domain/image';
import { ImageRelationalRepository } from './ImageRelationalRepository';

export class ImageRelationalRepositoryImpl
  implements ImageRelationalRepository {
  async getById(id: string): Promise<Image> {
    const result: QueryResult<Image> = await pool.query(
      `SELECT * FROM image WHERE id = $1`,
      [id]
    );

    return result.rows[0];
  }
  async _delete(id: string): Promise<boolean> {
    const deleted: QueryResult = await pool.query(
      `DELETE FROM image WHERE id = $1`,
      [id]
    );

    return !!deleted.rowCount;
  }

  async alreadyExists(folder: string, name: string): Promise<boolean> {
    const exists = await pool.query(
      `SELECT * FROM image WHERE name = $1 AND folder = $2 LIMIT 1`,
      [name, folder]
    );

    return !!exists.rowCount;
  }

  async getBackground(): Promise<Pick<Image, 'contentType' | 'image'>> {
    const result: QueryResult<Pick<
      Image,
      'contentType' | 'image'
    >> = await pool.query(
      `SELECT "contentType", "image" FROM image WHERE folder = 'background' ORDER BY random () LIMIT 1`,
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
      `SELECT "contentType", "image" FROM image WHERE name = $1 AND folder = $2 LIMIT 1`,
      [name, folder]
    );

    return result.rows[0];
  }

  async insertMany(images: Image[]): Promise<[boolean, number]> {
    const pg = await promisePool();
    const query = pgp().helpers.insert(
      images,
      ['name', 'folder', 'contentType', 'image'],
      'image'
    );
    await pg.none(query);
    return [true, images.length];
  }

  async insertOne(image: Image): Promise<boolean> {
    if (!(await this.alreadyExists(image.folder, image.name))) {
      const inserted: QueryResult = await pool.query(
        `INSERT INTO image (name,folder,"contentType",image) VALUES ($1,$2,$3,$4)`,
        [image.name, image.folder, image.contentType, image.image]
      );
      return !!inserted.rowCount;
    }
    return false;
  }
}
