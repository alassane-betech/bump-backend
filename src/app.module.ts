import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./modules/users/user.module";
import { ORM_CONFIG } from "./database/ormconfig";

@Module({
  imports: [TypeOrmModule.forRoot(ORM_CONFIG), UserModule],
  controllers: [],
  providers: []
})
export class AppModule {}
