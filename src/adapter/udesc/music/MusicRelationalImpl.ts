import { QueryResult } from 'pg';
import { pool } from '../../../database';
import { MusicRepository } from './MusicRepository';
import { Music } from '@domain/udesc/music';

export class MusicRepositoryRelationalImpl implements MusicRepository {
  async getAllMusics(): Promise<Music[]> {
    const result = await pool.query(`SELECT * FROM Music`, []);
    return result.rows;
  }
  async alreadyExists(music: Music): Promise<boolean> {
    const exists = await pool.query(
      `SELECT * FROM Music WHERE name = $1 and idLanguage = $2 and idSerie = $3`,
      [music.name, music.idLanguage, music.idSerie]
    );

    return !!exists.rowCount;
  }
  async _delete(id: string): Promise<boolean> {
    const deleted: QueryResult = await pool.query(
      `DELETE FROM Music where id = $1`,
      [id]
    );

    return !!deleted.rowCount;
  }
  async insertOne(music: Music): Promise<boolean> {
    if (!(await this.alreadyExists(music))) {
      const inserted: QueryResult = await pool.query(
        `INSERT INTO Music (idLanguage,idSerie,link,name) VALUES ($1,$2,$3,$4)`,
        [music.idLanguage, music.idSerie, music.link, music.name]
      );
      return !!inserted.rowCount;
    }
    return false;
  }
  async updateMusic(id: string, music: Music): Promise<boolean> {
    const result = await pool.query(
      `UPDATE Music SET name = $1, link = $2, idLanguage = $3, idSerie = $4 WHERE id = $5`,
      [music.name, music.link, music.idLanguage, music.idSerie, id]
    );

    return !!result.rowCount;
  }
  async getMusicById(id: string): Promise<Music> {
    const result = await pool.query(`select * from Music WHERE id = $1`, [id]);
    return result.rows[0];
  }
  async getMusic(name: string): Promise<Music[]> {
    const result = await pool.query(
      `SELECT * FROM Music WHERE name ilike '%' || $1 || '%'`,
      [name]
    );
    return result.rows;
  }
}
