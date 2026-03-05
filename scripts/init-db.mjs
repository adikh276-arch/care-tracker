import { neon } from '@neondatabase/serverless';

async function initDb() {
    const sql = neon('postgresql://neondb_owner:npg_EyoNpCSfLr16@ep-icy-tree-a133634u.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

    console.log('Initializing database...');

    try {
        // Create users table
        await sql`
      CREATE TABLE IF NOT EXISTS users (
        id BIGINT PRIMARY KEY,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
        console.log('Users table ready.');

        // Create selfcare_entries table
        await sql`
      CREATE TABLE IF NOT EXISTS selfcare_entries (
        id SERIAL PRIMARY KEY,
        user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
        date DATE NOT NULL,
        did_self_care BOOLEAN,
        activities TEXT[],
        duration TEXT,
        prevention_reasons TEXT[],
        helpful_type TEXT,
        mood TEXT,
        mood_emoji TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (user_id, date)
      );
    `;
        console.log('Selfcare entries table ready.');

        console.log('Database initialization complete.');
    } catch (err) {
        console.error('Error initializing database:', err);
        process.exit(1);
    }
}

initDb();
