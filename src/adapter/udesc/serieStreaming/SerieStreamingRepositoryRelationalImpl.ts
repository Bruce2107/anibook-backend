import { QueryResult } from 'pg';
import { pool } from '../../../database';
import { SerieStreaming } from '@domain/udesc/serieStreaming';
import { SerieStreamingRepository } from './SerieStreamingRepository';

export class SerieStreamingRepositoryRelationalImpl
  implements SerieStreamingRepository {
  async alreadyExists(serieStreaming: SerieStreaming): Promise<boolean> {
    const exists = await pool.query(
      `SELECT * FROM Serie_Streaming WHERE idSerie = $1 and idStreaming = $2`,
      [serieStreaming.idSerie, serieStreaming.idStreaming]
    );

    return !!exists.rowCount;
  }
  async _delete(id: string): Promise<boolean> {
    const deleted: QueryResult = await pool.query(
      `DELETE FROM Serie_Streaming where id = $1`,
      [id]
    );

    return !!deleted.rowCount;
  }
  async insertOne(serieStreaming: SerieStreaming): Promise<boolean> {
    if (!(await this.alreadyExists(serieStreaming))) {
      const inserted: QueryResult = await pool.query(
        `INSERT INTO Serie_Streaming (idStreaming, idSerie) VALUES ($1, $2)`,
        [serieStreaming.idStreaming, serieStreaming.idSerie]
      );
      return !!inserted.rowCount;
    }
    return false;
  }
  async updateSerieStreaming(
    id: string,
    serieStreaming: SerieStreaming
  ): Promise<boolean> {
    const result = await pool.query(
      `UPDATE Serie_Streaming SET idStreaming = $1, idSerie = $2 WHERE id = $3`,
      [serieStreaming.idStreaming, serieStreaming.idSerie, id]
    );

    return !!result.rowCount;
  }
  async getSerieStreaming(id: string): Promise<SerieStreaming> {
    const result = await pool.query(
      `SELECT * FROM Serie_Streaming WHERE id = $1`,
      [id]
    );
    return result.rows[0];
  }
}
