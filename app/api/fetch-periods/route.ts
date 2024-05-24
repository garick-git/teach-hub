import { currentUser } from '@clerk/nextjs/server';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(req: any) {
  const user = await currentUser();
  const userId = user?.id;
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);    
  const periodId = searchParams.get('id');

  if (!userId) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }

  try {
    let result;

    if (periodId) {
      result = await sql`
        SELECT * FROM Periods
        WHERE teacher = ${userId}
        AND id = ${periodId};`;

      // Return the first (and only) result as an object instead of an array
      if (result.rows.length > 0) {
        return NextResponse.json(result.rows[0], { status: 200 });
      } else {
        return NextResponse.json({ error: 'Period not found' }, { status: 404 });
      }
    } else {
      result = await sql`
        SELECT * FROM Periods
        WHERE teacher = ${userId};`;
      
      return NextResponse.json(result.rows, { status: 200 });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}