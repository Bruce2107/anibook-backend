import { pool } from '..';
import { User } from 'anibook';
import { QueryResult } from 'pg';

export async function alreadyExists(
  email: string,
  nickname: string
): Promise<boolean> {
  const exists = await pool.query(
    `(SELECT nickname FROM users WHERE nickname = $1) UNION ALL (SELECT email FROM users WHERE email = $2)`,
    [nickname, email]
  );
  return !!exists.rowCount;
}

export async function insert(
  email: string,
  nickname: string
): Promise<boolean> {
  const inserted = await pool.query(
    `INSERT INTO users (email,nickname) VALUES ($1,$2)`,
    [email, nickname]
  );
  return !!inserted.rowCount;
}

export async function get(nickname: string): Promise<QueryResult<User>> {
  return await pool.query(
    `(SELECT * FROM users WHERE nickname = $1) UNION ALL (SELECT * FROM users WHERE email = $1) LIMIT 1`,
    [nickname]
  );
}
