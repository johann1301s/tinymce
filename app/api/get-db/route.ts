import { getDbConnection } from '@/db/client';
import { NextResponse } from 'next/server';

export const GET = async() => {
  try {
    const pool = await getDbConnection();
    const result = await pool.request().query('SELECT * FROM MessagesPoc');

    const response = NextResponse.json({
      status: 200,
      foo: result.recordset,
    });
    response.headers.set("Content-Type", "application/json");
    return response;

  } catch (error) {
    const response = NextResponse.json({
      status: 200,
      error
    });
    response.headers.set("Content-Type", "application/json");
    return response;
  }
}
