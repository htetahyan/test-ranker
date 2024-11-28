import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
// for migrations
/* const migrationClient = postgres("postgres://postgres:jeremy@88.222.241.119:5432/testdb", { max: 1 });
migrate(drizzle(migrationClient), { migrationsFolder: "migrations",migrationsSchema: "public" }); */
// for query purposes

const connectionString = process.env.DATABASE_URL!;


export const db = drizzle(new Pool({ connectionString }))


export default db