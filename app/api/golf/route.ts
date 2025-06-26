import { GolfDataSchema } from '@/app/lib/schemas/golf'
import { revalidatePath } from 'next/cache'
import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

// GET all golf records
export async function GET() {
  try {
    const golfRecords = await sql`
      SELECT * FROM golf
      ORDER BY created DESC
    `
    return Response.json(golfRecords)
  } catch (error) {
    console.error('Failed to fetch golf records:', error)
    return Response.json({ error: 'Failed to fetch golf records' }, { status: 500 })
  }
}

// POST new golf record
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = GolfDataSchema.safeParse(body)
    
    if (!validatedData.success) {
      return Response.json(
        { error: 'Invalid data', details: validatedData.error.flatten() },
        { status: 400 }
      )
    }

    const result = await sql`
      INSERT INTO golf (data)
      VALUES (${JSON.stringify(validatedData.data)}::jsonb)
      RETURNING *
    `

    revalidatePath('/golf')
    return Response.json(result[0])
  } catch (error) {
    console.error('Failed to create golf record:', error)
    return Response.json({ error: 'Failed to create golf record' }, { status: 500 })
  }
}