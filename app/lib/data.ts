'use server'
import postgres from 'postgres';
import { GolfRound } from '../ui/golf/columns';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchGolfRounds() {
  try {
    const data = await sql<GolfRound[]>`
      SELECT 
        id,
        created,
        data::json as data  -- Explicitly cast to JSON
        FROM golf
      ORDER BY created DESC
    `;

    // Parse the JSONB data if it's coming back as a string
    return data.map(round => ({
      ...round,
      data: typeof round.data === 'string' ? JSON.parse(round.data) : round.data
    }));

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch golf rounds.');
  }
}