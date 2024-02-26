import type { Config } from 'drizzle-kit'

export default {
   schema: './src/schema.ts',
   out: './drizzle',
   driver: 'mysql2',
   dbCredentials: {
      host: 'localhost',
      user: 'root',
      database: 'mysql',
      password: 'OmriDev123123',
   },
} satisfies Config
