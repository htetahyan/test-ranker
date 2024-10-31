
import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: "./src/db/schema/schema.ts",
  dialect: 'postgresql',
  dbCredentials:{
    url:process.env.DATABASE_URL!
  },
  
  
 
})