import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.js';

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/sololaunch';

// Client connection (serverless friendly with connection pooling)
export const queryClient = postgres(connectionString, { max: 10, idle_timeout: 20 });
export const db = drizzle(queryClient, { schema });
export { schema };
