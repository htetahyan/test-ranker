import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
// for migrations
/* const migrationClient = postgres("postgres://postgres:jeremy@88.222.241.119:5432/testdb", { max: 1 });
migrate(drizzle(migrationClient), { migrationsFolder: "migrations",migrationsSchema: "public" }); */
// for query purposes

const connectionString = process.env.DATABASE_URL!;

declare global {
  var postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

let postgresSqlClient;

if (process.env.NODE_ENV !== "production") {
  if (!global.postgresSqlClient) {
    global.postgresSqlClient = postgres(connectionString);
  }
  postgresSqlClient = global.postgresSqlClient;
} else {
  postgresSqlClient = postgres(connectionString);
}

 const db = drizzle(postgresSqlClient);

export default db