import { QueryResult } from 'pg';
import { pool } from '../../../database';
import { StudioRepository } from './StudioRepository';
import { Studio } from '@domain/udesc/studio';

export class StudioRepositoryRelationalImpl implements StudioRepository {
  async getAllStudios(): Promise<Studio[]> {
    const result = await pool.query(`SELECT * FROM Studio`, []);
    return result.rows;
  }
  async alreadyExists(studio: Studio): Promise<boolean> {
    const exists = await pool.query(`SELECT * FROM Studio WHERE name = $1`, [
      studio.name,
    ]);

    return !!exists.rowCount;
  }
  async _delete(id: string): Promise<boolean> {
    const deleted: QueryResult = await pool.query(
      `DELETE FROM Studio where id = $1`,
      [id]
    );

    return !!deleted.rowCount;
  }
  async insertOne(studio: Studio): Promise<boolean> {
    if (!(await this.alreadyExists(studio))) {
      const inserted: QueryResult = await pool.query(
        `INSERT INTO Studio (name) VALUES ($1)`,
        [studio.name]
      );
      return !!inserted.rowCount;
    }
    return false;
  }
  async updateStudio(id: string, studio: Studio): Promise<boolean> {
    const result = await pool.query(
      `UPDATE Studio SET name = $1 WHERE id = $2`,
      [studio.name, id]
    );

    return !!result.rowCount;
  }
  async getStudio(id: string): Promise<Studio> {
    const result = await pool.query(`select * from Studio WHERE id = $1`, [id]);
    return result.rows[0];
  }
}
