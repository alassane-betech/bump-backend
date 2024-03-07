import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import {
  DATABASE_HOST,
  DATABASE_LOGGING,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USER
} from "src/environments";

export const ORM_CONFIG: TypeOrmModuleOptions = {
  type: "postgres",
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  logging: DATABASE_LOGGING,
  autoLoadEntities: true,
  synchronize: true
};
