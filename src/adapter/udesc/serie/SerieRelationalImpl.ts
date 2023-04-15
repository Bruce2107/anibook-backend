import { QueryResult } from 'pg';
import { pool } from '../../../database';
import { Serie } from '@domain/udesc/serie';
import { SerieRepository } from './SerieRepository';

export class SerieRepositoryRelationalImpl implements SerieRepository {
  async getAllSeries(): Promise<Serie[]> {
    const result = await pool.query(`SELECT * FROM Serie`, []);
    return result.rows;
  }
  async alreadyExists(serie: Serie): Promise<boolean> {
    const exists = await pool.query(
      `SELECT * FROM Serie WHERE name = $1 and idStudio = $2 `,
      [serie.name, serie.idStudio]
    );

    return !!exists.rowCount;
  }
  async _delete(id: string): Promise<boolean> {
    const deleted: QueryResult = await pool.query(
      `DELETE FROM Serie where id = $1`,
      [id]
    );

    return !!deleted.rowCount;
  }
  async insertOne(serie: Serie): Promise<boolean> {
    if (!(await this.alreadyExists(serie))) {
      const inserted: QueryResult = await pool.query(
        `INSERT INTO Serie (comment, cover, createdAt, idStudio,name, numberOfEpisodes, status, synopsis, updatedAt) VALUES ($1,$2,NOW()::timestamp,$3,$4,$5,$6,$7,NOW()::timestamp)`,
        [
          serie.comment,
          serie.cover,
          serie.idStudio,
          serie.name,
          serie.numberOfEpisodes,
          serie.status,
          serie.synopsis,
        ]
      );
      return !!inserted.rowCount;
    }
    return false;
  }
  async updateSerie(id: string, serie: Serie): Promise<boolean> {
    const result = await pool.query(
      `UPDATE Serie SET comment = $1, cover = $2, idStudio = $3, name = $4, numberOfEpisodes = $5, status = $6, synopsis = $7, updatedAt = NOW()::timestamp WHERE id = $8`,
      [
        serie.comment,
        serie.cover,
        serie.idStudio,
        serie.name,
        serie.numberOfEpisodes,
        serie.status,
        serie.synopsis,
        id,
      ]
    );

    return !!result.rowCount;
  }
  async getSerieById(id: string): Promise<Serie> {
    const result = await pool.query(`select * from Serie WHERE id = $1`, [id]);
    return result.rows[0];
  }

  async getSerie(name: string): Promise<Serie[]> {
    const result = await pool.query(
      `SELECT * FROM Serie WHERE name ilike '%' || $1 || '%'`,
      [name]
    );
    return result.rows;
  }
}
