import { QueryResult } from 'pg';
import { pool } from '../';

export async function alreadyExists(
  table: string,
  name: string
): Promise<boolean> {
  const exists: QueryResult = await pool.query(
    `SELECT id FROM ${table} WHERE dados ->> 'name' = $1`,
    [name]
  );
  return !!exists.rowCount;
}

export async function insert<T>(
  table: string,
  fields: string[],
  data: T
): Promise<boolean> {
  const fieldsString: string = fields.join();
  const inserted: QueryResult = await pool.query(
    `INSERT INTO ${table} (${fieldsString}) VALUES ($1)`,
    [data]
  );

  return !!inserted.rowCount;
}

export async function __delete(table: string, name: string): Promise<boolean> {
  const deleted: QueryResult = await pool.query(
    `DELETE FROM ${table} WHERE dados ->> 'name' = $1`,
    [name]
  );

  return !!deleted;
}

export async function getRandom<T>(
  table: string,
  limit: string,
  fields: string[]
): Promise<QueryResult<T>> {
  const fieldsString: string = fields.join();
  return await pool.query(
    `SELECT ${fieldsString} FROM ${table} ORDER BY random () LIMIT $1`,
    [limit]
  );
}

export async function getOne<T>(
  table: string,
  name: string,
  fields: string[]
): Promise<QueryResult<T>> {
  const fieldsString: string = fields.join();
  return await pool.query(
    `SELECT ${fieldsString} FROM ${table} WHERE dados ->> 'name' = $1`,
    [name]
  );
}

export async function update<T>(
  table: string,
  name: string,
  newData: T
): Promise<QueryResult<T>> {
  return await pool.query(
    `UPDATE ${table} SET dados = $1 WHERE dados ->> 'name' = $2`,
    [newData, name]
  );
}
