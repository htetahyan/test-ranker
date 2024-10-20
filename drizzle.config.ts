
import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: "./src/db/schema/schema.ts",
  dialect: 'postgresql',
  dbCredentials:{
    url:"postgresql://neon_owner:as1CGNK6Lmpo@ep-tiny-poetry-a6d3u7xm.us-west-2.aws.neon.tech/neon?sslmode=require"
  },
  
  
 
})