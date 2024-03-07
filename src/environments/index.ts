import "dotenv/config";

export const PORT = process.env.PORT,
  ENV = process.env.ENV,
  DATABASE_HOST = process.env.DATABASE_HOST,
  DATABASE_PORT = Number(process.env.DATABASE_PORT),
  DATABASE_USER = process.env.DATABASE_USER,
  DATABASE_PASSWORD = process.env.DATABASE_PASSWORD,
  DATABASE_NAME = process.env.DATABASE_NAME,
  DATABASE_LOGGING = Boolean(process.env.DATABASE_LOGGING),
  SERVICE_PREFIX = process.env.SERVICE_PREFIX;
