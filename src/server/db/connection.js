import pg from 'pg';

const { Pool } = pg;
const { PG_USER, PG_HOST, PG_DATABASE, PG_PASSWORD, PG_PORT } = process.env;
export const pool = new Pool({
  user: PG_USER,
  host: PG_HOST,
  database: PG_DATABASE,
  password: null,
  port: PG_PORT,
});

export const db = await pool.connect();
