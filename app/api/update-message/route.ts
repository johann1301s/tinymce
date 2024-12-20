import { getDbConnection } from '@/db/client';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const query = `
      UPDATE Messages
      SET Message = '${searchParams.get('message') || '-'}'
      WHERE ID = 1;
    `

    const pool = await getDbConnection();
    const result = await pool.request().query(query);

    const response = NextResponse.json({
      status: 200,
      foo: result.recordset,
    });
    response.headers.set("Content-Type", "application/json");
    return response;

  } catch (error) {
    const response = NextResponse.json({
      status: 500,
      error
    });
    response.headers.set("Content-Type", "application/json");
    return response;
  }
}
