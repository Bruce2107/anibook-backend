import { QueryResult } from 'pg';
import { pool } from '../../../database';
import { AuthorSerie } from '@domain/udesc/authorSerie';
import { AuthorSerieRepository } from './AuthorSerieRepository';

export class AuthorSerieRepositoryRelationalImpl
  implements AuthorSerieRepository {
  async alreadyExists(idAuthor: string, idSerie: string): Promise<boolean> {
    const exists = await pool.query(
      `SELECT * FROM AuthorSerie WHERE idSerie = $1 and idAuthor = $2`,
      [idSerie, idAuthor]
    );

    return !!exists.rowCount;
  }
  async _delete(id: string): Promise<boolean> {
    const deleted: QueryResult = await pool.query(
      `DELETE FROM AuthorSerie where id = $1`,
      [id]
    );

    return !!deleted.rowCount;
  }
  async insertOne(idAuthor: string, idSerie: string): Promise<boolean> {
    if (!(await this.alreadyExists(idAuthor, idSerie))) {
      const inserted: QueryResult = await pool.query(
        `INSERT INTO AuthorSerie (idAuthor, idSerie) VALUES ($1, $2)`,
        [idAuthor, idSerie]
      );
      return !!inserted.rowCount;
    }
    return false;
  }
  async updateAuthorSerie(
    id: string,
    authorSerie: AuthorSerie
  ): Promise<boolean> {
    const result = await pool.query(
      `UPDATE AuthorSerie SET idAuthor = $1, idSerie = $2 WHERE id = $3`,
      [authorSerie.idAuthor, authorSerie.idSerie, id]
    );

    return !!result.rowCount;
  }
  async getAuthorSerie(id: string): Promise<AuthorSerie> {
    const result = await pool.query(`SELECT * FROM AuthorSerie WHERE id = $1`, [
      id,
    ]);
    return result.rows[0];
  }
}
