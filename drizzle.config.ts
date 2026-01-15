import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './drizzle/schema.ts',
  out: './drizzle/migrations',
  dialect: 'mysql',
  dbCredentials: {
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT || '4000'),
    user: process.env.DB_USERNAME?.replace(/'/g, '') || '',
    password: process.env.DB_PASSWORD?.replace(/'/g, '') || '',
    database: process.env.DB_DATABASE?.replace(/'/g, '') || 'test',
    ssl: {
      rejectUnauthorized: true
    }
  },
});
