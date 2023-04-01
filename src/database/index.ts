import { Pool } from 'pg';
import pgPromise from 'pg-promise';
import { config } from 'dotenv';

/* istanbul ignore next */
config({
  path:
    process.env.NODE_ENV === 'qa' || process.env.NODE_ENV === 'test'
      ? '.env.qa'
      : '.env.qa',
});

export const pool = new Pool({
  user: process.env.DB_USER_POSTGRES as string,
  host: process.env.DB_HOST_POSTGRES as string,
  password: process.env.DB_PASS_POSTGRES as string,
  database: process.env.DB_NAME_POSTGRES as string,
  port: Number(process.env.DB_PORT_POSTGRES),
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
