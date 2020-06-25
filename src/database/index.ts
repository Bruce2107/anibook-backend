import { Pool } from 'pg';
import pgPromise from 'pg-promise';

export const pool = new Pool({
  user: (process.env.DB_USER_POSTGRES as string) || 'eduhenriquezup',
  host: (process.env.DB_HOST_POSTGRES as string) || 'localhost',
  password: (process.env.DB_PASS_POSTGRES as string) || 'anibook',
  database: (process.env.DB_NAME_POSTGRES as string) || 'anibook',
  port: Number(process.env.DB_PORT_POSTGRES) || 5432,
});

export const promisePool = async () => {
  const pgp = pgPromise();
  return pgp(
    `postgres://${process.env.DB_USER_POSTGRES as string}:${
      process.env.DB_PASS_POSTGRES as string
    }@${process.env.DB_HOST_POSTGRES as string}:${Number(
      process.env.DB_PORT_POSTGRES
    )}/${process.env.DB_NAME_POSTGRES as string}`
  );
};
