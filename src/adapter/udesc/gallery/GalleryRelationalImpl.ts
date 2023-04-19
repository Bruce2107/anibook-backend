import { QueryResult } from 'pg';
import { pool } from '../../../database';
import { Gallery } from '@domain/udesc/gallery';
import { Image } from '@domain/image';
import { GalleryRepository } from './GalleryRepository';

export class GalleryRepositoryRelationalImpl implements GalleryRepository {
  async alreadyExists(gallery: Gallery): Promise<boolean> {
    const exists = await pool.query(
      `SELECT * FROM Gallery WHERE idSerie = $1 and idImage = $2`,
      [gallery.idSerie, gallery.idImage]
    );

    return !!exists.rowCount;
  }
  async _delete(id: string): Promise<boolean> {
    const deleted: QueryResult = await pool.query(
      `DELETE FROM Gallery where id = $1`,
      [id]
    );

    return !!deleted.rowCount;
  }
  async insertOne(gallery: Gallery): Promise<boolean> {
    if (!(await this.alreadyExists(gallery))) {
      const inserted: QueryResult = await pool.query(
        `INSERT INTO Gallery (idSerie, idImage) VALUES ($1, $2)`,
        [gallery.idSerie, gallery.idImage]
      );
      return !!inserted.rowCount;
    }
    return false;
  }
  async updateGallery(id: string, gallery: Gallery): Promise<boolean> {
    const result = await pool.query(
      `UPDATE Gallery SET idSerie = $1, idImage = $2 WHERE id = $3`,
      [gallery.idSerie, gallery.idImage, id]
    );

    return !!result.rowCount;
  }
  async getGallery(idSerie: string): Promise<Image[]> {
    const result = await pool.query(
      `select i.*, s.name as idserie from image i join gallery g on g.idimage = i.id join Serie s on s.id = g.idserie and g.idserie = $1`,
      [idSerie]
    );
    return result.rows;
  }
}
