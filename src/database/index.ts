import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  user: process.env.DB_USER as string | 'eduhenriquezup',
  host: process.env.DB_HOST as string | 'localhost',
  password: process.env.DB_PASS as string | 'anibook',
  database: process.env.DB_NAME as string | 'anibook',
  port: Number(process.env.DB_PORT) | 5432,
});
