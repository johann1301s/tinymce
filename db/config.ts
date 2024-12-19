// dbConfig.ts
export interface DBConfig {
    user: string;
    password: string;
    server: string;
    database: string;
    options: {
      encrypt: boolean;
      trustServerCertificate: boolean;
    };
  }
  
  export const dbConfig: DBConfig = {
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    server: process.env.DB_SERVER || '',
    database: process.env.DB_DATABASE || '',
    options: {
      encrypt: true,
      trustServerCertificate: true
    }
  };