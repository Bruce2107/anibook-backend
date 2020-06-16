import { QueryResult } from 'pg';
import { pool } from '../../../database';
import AnimeMangaRepository from '../../../usecase/port/AnimeMangaRepository';

export default class DatabaseAnimeMangaRepository<T>
  implements AnimeMangaRepository<T> {
  async _delete(type: string, name: string): Promise<boolean> {
    const deleted: QueryResult = await pool.query(
      `DELETE FROM ${type} WHERE dados ->> 'name' = $1`,
      [name]
    );
    return !!deleted.rowCount;
  }

  async alreadyExists(type: string, name: string): Promise<boolean> {
    const exists: QueryResult = await pool.query(
      `SELECT id FROM ${type} WHERE dados ->> 'name' = $1`,
      [name]
    );
    return !!exists.rowCount;
  }
  async getAllSorted(
    type: string,
    limit: string,
    sortField: string,
    fields: string[]
  ): Promise<Array<T>> {
    const fieldsString: string = fields.join();
    const result = await pool.query(
      `SELECT ${fieldsString} FROM ${type} ORDER BY dados ->> '${sortField}' LIMIT $1`,
      [limit]
    );
    return result.rows;
  }

  async getOne(
    type: string,
    name: string,
    fields: string[]
  ): Promise<T | null> {
    const fieldsString: string = fields.join();
    const result = await pool.query(
      `SELECT ${fieldsString} FROM ${type} WHERE dados ->> 'name' = $1`,
      [name]
    );
    return result.rows[0] ? result.rows[0].dados || result.rows[0] : null;
  }

  async getRandom(type: string, limit: string, fields: string[]): Promise<T[]> {
    const fieldsString: string = fields.join();
    const result: QueryResult<T> = await pool.query(
      `SELECT ${fieldsString} FROM ${type} ORDER BY random () LIMIT $1`,
      [limit]
    );
    return result.rows;
  }

  async insert(type: string, fields: string[], data: T): Promise<boolean> {
    const fieldsString: string = fields.join();
    const inserted: QueryResult = await pool.query(
      `INSERT INTO ${type} (${fieldsString}) VALUES ($1)`,
      [data]
    );

    return !!inserted.rowCount;
  }

  async update(type: string, name: string, newData: T): Promise<boolean> {
    const result = await pool.query(
      `UPDATE ${type} SET dados = $1 WHERE dados ->> 'name' = $2`,
      [newData, name]
    );

    return !!result.rowCount;
  }
}
