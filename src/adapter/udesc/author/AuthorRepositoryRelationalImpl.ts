import { Author } from '@domain/udesc/author';
import { AuthorRepository } from './AuthorRepository';
import { QueryResult } from 'pg';
import { pool } from '../../../database';

export class AuthorRepositoryRelationalImpl implements AuthorRepository {
  async alreadyExists(name: string): Promise<boolean> {
    const exists = await pool.query(`SELECT * FROM Author WHERE name = $1`, [
      name,
    ]);

    return !!exists.rowCount;
  }
  async _delete(id: string): Promise<boolean> {
    const deleted: QueryResult = await pool.query(
      `DELETE FROM Author where id = $1`,
      [id]
    );

    return !!deleted.rowCount;
  }
  async insertOne(name: string): Promise<boolean> {
    if (!(await this.alreadyExists(name))) {
      const inserted: QueryResult = await pool.query(
        `INSERT INTO Author (name) VALUES ($1)`,
        [name]
      );
      return !!inserted.rowCount;
    }
    return false;
  }
  async updateAuthor(id: string, data: Author): Promise<boolean> {
    const result = await pool.query(
      `UPDATE Author SET name = $1 WHERE id = $2`,
      [data.name, id]
    );

    return !!result.rowCount;
  }
  async getAuthor(name: string): Promise<Author> {
    const result = await pool.query(`SELECT * FROM Author WHERE name = $1`, [
      name,
    ]);
    return result.rows[0];
  }
}
