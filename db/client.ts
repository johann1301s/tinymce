// dbConnect.ts
import sql, { ConnectionPool } from 'mssql';
import { dbConfig } from './config';

let pool: ConnectionPool | undefined;

export const getDbConnection = async (): Promise<ConnectionPool> => {
  if (!pool) {
    pool = await sql.connect(dbConfig);
  }
  return pool;
};
