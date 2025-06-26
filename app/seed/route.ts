import bcrypt from 'bcrypt';
import postgres from 'postgres';
import { users } from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedUsers() {
  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function setupDatabase() {
  try {
    // Create extension
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      )
    `;

    // Create golf table
    await sql`
      CREATE TABLE IF NOT EXISTS golf (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        data jsonb NOT NULL DEFAULT '{}'::jsonb
      )
    `;

    // Check and seed users if needed
    const userCount = await sql`SELECT COUNT(*) FROM users`;
    if (userCount[0].count === '0') {
      await seedUsers();
    }

    return { success: true };
  } catch (error) {
    console.error('Error in setupDatabase:', error);
    throw error;
  }
}

export async function GET() {
  try {
    // Execute setup without using sql.begin
    await setupDatabase();
    
    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Error in GET:', error);
    return Response.json({ error }, { status: 500 });
  }
}