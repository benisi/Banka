import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL_TEST;

const connect = {
  connectionString
};

const pool = new Pool(connect);

export default pool;
