
import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: "./src/db/schema/schema.ts",
  dialect: 'postgresql',
  dbCredentials:{
    url:"postgres://postgres:jeremy@88.222.241.119:5432/testdbs"
  },
  
  
 
})