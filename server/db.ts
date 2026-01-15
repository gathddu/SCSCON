import 'dotenv/config';
import { drizzle} from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '../drizzle/schema';

const connectionConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '4000'),
  user: process.env.DB_USERNAME?.replace(/'/g, ''),
  password: process.env.DB_PASSWORD?.replace(/'/g, ''),
  database: process.env.DB_DATABASE?.replace(/'/g, ''),
  ssl: {
    rejectUnauthorized: true
  }
};

export const pool = mysql.createPool(connectionConfig);

export const db = drizzle(pool, { schema, mode: 'default' });

export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('database connected successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('database connection failed:', error);
    return false;
  }
}
