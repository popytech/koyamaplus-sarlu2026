import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';

const url = process.env.DATABASE_URL;
if (!url) {
  console.error('DATABASE_URL not set');
  process.exit(1);
}

const sql = neon(url);
const schema = readFileSync(process.argv[2], 'utf8');

const statements = schema
  .split(/;\s*\n/)
  .map((s) => s.trim())
  .filter(Boolean);

for (const stmt of statements) {
  await sql(stmt);
  console.log('OK:', stmt.split('\n')[0]);
}

console.log('Schema applied successfully.');
