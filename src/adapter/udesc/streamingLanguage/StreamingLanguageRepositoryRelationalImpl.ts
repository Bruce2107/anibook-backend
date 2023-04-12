import { QueryResult } from 'pg';
import { pool } from '../../../database';
import { StreamingLanguage } from '@domain/udesc/streamingLanguage';
import { StreamingLanguageRepository } from './StreamingLanguageRepository';

export class StreamingLanguageRepositoryRelationalImpl
  implements StreamingLanguageRepository {
  async alreadyExists(streamingLanguage: StreamingLanguage): Promise<boolean> {
    const exists = await pool.query(
      `SELECT * FROM StreamingLanguage WHERE idLanguage = $1 and idStreaming = $2`,
      [streamingLanguage.idLanguage, streamingLanguage.idStreaming]
    );

    return !!exists.rowCount;
  }
  async _delete(id: string): Promise<boolean> {
    const deleted: QueryResult = await pool.query(
      `DELETE FROM StreamingLanguage where id = $1`,
      [id]
    );

    return !!deleted.rowCount;
  }
  async insertOne(streamingLanguage: StreamingLanguage): Promise<boolean> {
    if (!(await this.alreadyExists(streamingLanguage))) {
      const inserted: QueryResult = await pool.query(
        `INSERT INTO StreamingLanguage (idStreaming, idLanguage) VALUES ($1, $2)`,
        [streamingLanguage.idStreaming, streamingLanguage.idLanguage]
      );
      return !!inserted.rowCount;
    }
    return false;
  }
  async updateStreamingLanguage(
    id: string,
    streamingLanguage: StreamingLanguage
  ): Promise<boolean> {
    const result = await pool.query(
      `UPDATE StreamingLanguage SET idStreaming = $1, idLanguage = $2 WHERE id = $3`,
      [streamingLanguage.idStreaming, streamingLanguage.idLanguage, id]
    );

    return !!result.rowCount;
  }
  async getStreamingLanguage(id: string): Promise<StreamingLanguage> {
    const result = await pool.query(
      `SELECT * FROM StreamingLanguage WHERE id = $1`,
      [id]
    );
    return result.rows[0];
  }
}
