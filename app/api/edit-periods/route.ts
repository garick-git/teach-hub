import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Create the Periods table if it does not exist
    await sql`
    CREATE TABLE IF NOT EXISTS Periods (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30),
        number INT CHECK (number BETWEEN 1 AND 12),
        teacher VARCHAR(255),
        students INTEGER[],
        CONSTRAINT unique_teacher_number UNIQUE (teacher, number)
    );`;

    return NextResponse.json({ message: 'Tables created successfully' }, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
    try {
      const { name, number, teacher, students } = await request.json();
  
      // Insert a new period into the Periods table
      const periodResult = await sql`
        INSERT INTO Periods (name, number, teacher, students)
        VALUES (${name}, ${number}, ${teacher}, ${students});
      `;

      // Return the newly created period data
      return NextResponse.json(periodResult.rows[0], { status: 201 });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}  