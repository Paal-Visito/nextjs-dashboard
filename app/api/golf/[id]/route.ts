import { GolfDataSchema } from '@/app/lib/schemas/golf'
import { revalidatePath } from 'next/cache'
import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

// GET single golf record
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const record = await sql`
      SELECT * FROM golf
      WHERE id = ${params.id}
    `
    
    if (!record[0]) {
      return Response.json({ error: 'Record not found' }, { status: 404 })
    }

    return Response.json(record[0])
  } catch (error) {
    console.error('Failed to fetch golf record:', error)
    return Response.json({ error: 'Failed to fetch golf record' }, { status: 500 })
  }
}

// UPDATE golf record
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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
      UPDATE golf
      SET data = ${JSON.stringify(validatedData.data)}::jsonb,
          updated = CURRENT_TIMESTAMP
      WHERE id = ${params.id}
      RETURNING *
    `

    if (!result[0]) {
      return Response.json({ error: 'Record not found' }, { status: 404 })
    }

    revalidatePath('/golf')
    return Response.json(result[0])
  } catch (error) {
    console.error('Failed to update golf record:', error)
    return Response.json({ error: 'Failed to update golf record' }, { status: 500 })
  }
}

// DELETE golf record
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const result = await sql`
      DELETE FROM golf
      WHERE id = ${params.id}
      RETURNING id
    `

    if (!result[0]) {
      return Response.json({ error: 'Record not found' }, { status: 404 })
    }

    revalidatePath('/golf')
    return Response.json({ message: 'Record deleted successfully' })
  } catch (error) {
    console.error('Failed to delete golf record:', error)
    return Response.json({ error: 'Failed to delete golf record' }, { status: 500 })
  }
}