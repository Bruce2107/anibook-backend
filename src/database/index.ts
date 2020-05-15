import { Pool } from 'pg';

export const pool = new Pool({
  user: 'eduhenriquezup',
  host: 'localhost',
  password: 'anibook',
  database: 'anibook',
  port: 5432,
});
