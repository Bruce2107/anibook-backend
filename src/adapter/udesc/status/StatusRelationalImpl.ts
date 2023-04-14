import { QueryResult } from 'pg';
import { pool } from '../../../database';
import { StatusRepository } from './StatusRepository';
import { Status } from '@domain/udesc/status';

export class StatusRepositoryRelationalImpl implements StatusRepository {
  async getAllStatus(): Promise<Status[]> {
    const result = await pool.query(`SELECT * FROM Status`, []);
    return result.rows;
  }
  async alreadyExists(status: Status): Promise<boolean> {
    const exists = await pool.query(`SELECT * FROM Status WHERE value = $1`, [
      status.value,
    ]);

    return !!exists.rowCount;
  }
  async _delete(id: string): Promise<boolean> {
    const deleted: QueryResult = await pool.query(
      `DELETE FROM Status where id = $1`,
      [id]
    );

    return !!deleted.rowCount;
  }
  async insertOne(status: Status): Promise<boolean> {
    if (!(await this.alreadyExists(status))) {
      const inserted: QueryResult = await pool.query(
        `INSERT INTO Status (value) VALUES ($1)`,
        [status.value]
      );
      return !!inserted.rowCount;
    }
    return false;
  }
  async updateStatus(id: string, status: Status): Promise<boolean> {
    const result = await pool.query(
      `UPDATE Status SET value = $1 WHERE id = $2`,
      [status.value, id]
    );

    return !!result.rowCount;
  }
  async getStatus(id: string): Promise<Status> {
    const result = await pool.query(`select * from Status WHERE id = $1`, [id]);
    return result.rows[0];
  }
}
