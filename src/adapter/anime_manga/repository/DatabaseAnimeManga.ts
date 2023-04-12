import { QueryResult } from 'pg';
import { pool } from '../../../database';
import { AnimeMangaRepository } from '@usecase/port/AnimeMangaRepository';

export class DatabaseAnimeMangaRepository<T>
  implements AnimeMangaRepository<T> {
  constructor(private type: string) {}

  async _delete(name: string): Promise<boolean> {
    const deleted: QueryResult = await pool.query(
      `DELETE FROM ${this.type} WHERE dados ->> 'name' = $1`,
      [name]
    );
    return !!deleted.rowCount;
  }

  async alreadyExists(name: string): Promise<boolean> {
    const exists: QueryResult = await pool.query(
      `SELECT id FROM ${this.type} WHERE dados ->> 'name' = $1`,
      [name]
    );
    return !!exists.rowCount;
  }
  async getAllSorted(
    limit: string,
    sortField: string,
    fields: string[]
  ): Promise<Array<T>> {
    const fieldsString: string = fields.join();
    const result = await pool.query(
      `SELECT ${fieldsString} FROM ${this.type} ORDER BY dados ->> '${sortField}' LIMIT $1`,
      [limit]
    );
    return result.rows;
  }

  async getOne(name: string, fields: string[]): Promise<T | null> {
    const fieldsString: string = fields.join();
    const result = await pool.query(
      `SELECT ${fieldsString} FROM ${this.type} WHERE dados ->> 'name' = $1`,
      [name]
    );
    return result.rows[0] ? result.rows[0].dados || result.rows[0] : null;
  }

  async getRandom(limit: string, fields: string[]): Promise<T[]> {
    const fieldsString: string = fields.join();
    const result: QueryResult = await pool.query(
      `SELECT ${fieldsString} FROM ${this.type} ORDER BY random () LIMIT $1`,
      [limit]
    );
    return result.rows;
  }

  async insert(fields: string[], data: T): Promise<boolean> {
    const fieldsString: string = fields.join();
    const inserted: QueryResult = await pool.query(
      `INSERT INTO ${this.type} (${fieldsString}) VALUES ($1)`,
      [data]
    );

    return !!inserted.rowCount;
  }

  async update(name: string, newData: T): Promise<boolean> {
    const result = await pool.query(
      `UPDATE ${this.type} SET dados = $1 WHERE dados ->> 'name' = $2`,
      [newData, name]
    );

    return !!result.rowCount;
  }
}
