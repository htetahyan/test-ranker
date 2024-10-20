import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
// for migrations
/* const migrationClient = postgres("postgres://postgres:jeremy@88.222.241.119:5432/testdb", { max: 1 });
migrate(drizzle(migrationClient), { migrationsFolder: "migrations",migrationsSchema: "public" }); */
// for query purposes

const connectionString = "postgresql://neon_owner:as1CGNK6Lmpo@ep-tiny-poetry-a6d3u7xm.us-west-2.aws.neon.tech/neon?sslmode=require";

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