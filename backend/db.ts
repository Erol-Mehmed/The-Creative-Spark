import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  password: '123456',
  host: '127.0.0.1',
  port: 5432,
  database: 'creative_spark',
});

export default { query: (text: string, params: object[]) => pool.query(text, params)};
