import { neon } from '@neondatabase/serverless';

// Lazily created — throws a clear error if DATABASE_URL is missing rather than
// failing with an opaque driver error deep in a query.
export function sql() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL is not set (Vercel project env vars)');
  }
  return neon(url);
}
