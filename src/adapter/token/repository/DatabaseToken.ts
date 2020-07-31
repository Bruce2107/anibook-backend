import { User } from 'anibook';
import { QueryResult } from 'pg';
import { pool } from '../../../database';
import TokenRepository from '@usecase/port/TokenRepository';

export default class DatabaseToken implements TokenRepository {
  async alreadyExists(email: string, nickname: string): Promise<boolean> {
    const exists = await pool.query(
      `(SELECT nickname FROM users WHERE nickname = $1) UNION ALL (SELECT email FROM users WHERE email = $2)`,
      [nickname, email]
    );
    return !!exists.rowCount;
  }
  async getOne(value: string): Promise<User> {
    const result: QueryResult<User> = await pool.query(
      `(SELECT * FROM users WHERE nickname = $1) UNION ALL (SELECT * FROM users WHERE email = $1) LIMIT 1`,
      [value]
    );

    return result.rows[0];
  }

  async insertOne(email: string, nickname: string): Promise<boolean> {
    if (!(await this.alreadyExists(email, nickname))) {
      const inserted = await pool.query(
        `INSERT INTO users (email,nickname) VALUES ($1,$2)`,
        [email, nickname]
      );
      return !!inserted.rowCount;
    }
    return false;
  }

  async _delete(value: string): Promise<boolean> {
    const deleted = await pool.query(
      'DELETE FROM users WHERE nickname = $1 OR email = $1',
      [value]
    );
    return !!deleted.rowCount;
  }
}
