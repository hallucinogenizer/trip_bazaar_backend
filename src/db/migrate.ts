import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import { migrate } from 'drizzle-orm/neon-http/migrator'
import { config } from 'dotenv';

config({
    path: ".dev.vars"
})

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql);

const main = async () => {
    try {
        await migrate(db, {
            migrationsFolder: 'drizzle'
        });

        console.log("Migration successful")
    } catch (err) {
        console.error(err);
        process.exit(1)
    }
}

main();