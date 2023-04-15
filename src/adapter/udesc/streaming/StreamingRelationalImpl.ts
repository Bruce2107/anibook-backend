import { QueryResult } from 'pg';
import { pool } from '../../../database';
import { StreamingRepository } from './StreamingRepository';
import { Streaming } from '@domain/udesc/streaming';

export class StreamingRepositoryRelationalImpl implements StreamingRepository {
  async getAllStreamings(): Promise<Streaming[]> {
    const result = await pool.query(`SELECT * FROM Streaming`, []);
    return result.rows;
  }
  async alreadyExists(streaming: Streaming): Promise<boolean> {
    const exists = await pool.query(`SELECT * FROM Streaming WHERE name = $1`, [
      streaming.name,
    ]);

    return !!exists.rowCount;
  }
  async _delete(id: string): Promise<boolean> {
    const deleted: QueryResult = await pool.query(
      `DELETE FROM Streaming where id = $1`,
      [id]
    );

    return !!deleted.rowCount;
  }
  async insertOne(streaming: Streaming): Promise<boolean> {
    if (!(await this.alreadyExists(streaming))) {
      const inserted: QueryResult = await pool.query(
        `INSERT INTO Streaming (name,link) VALUES ($1,$2)`,
        [streaming.name, streaming.link]
      );
      return !!inserted.rowCount;
    }
    return false;
  }
  async updateStreaming(id: string, streaming: Streaming): Promise<boolean> {
    const result = await pool.query(
      `UPDATE Streaming SET name = $1, link = $2 WHERE id = $3`,
      [streaming.name, streaming.link, id]
    );

    return !!result.rowCount;
  }
  async getStreamingById(id: string): Promise<Streaming> {
    const result = await pool.query(`select * from Streaming WHERE id = $1`, [
      id,
    ]);
    return result.rows[0];
  }
  async getStreaming(name: string): Promise<Streaming[]> {
    const result = await pool.query(
      `SELECT * FROM Streaming WHERE name ilike '%' || $1 || '%'`,
      [name]
    );
    return result.rows;
  }
}
