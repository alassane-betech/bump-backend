import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./modules/users/user.module";
import { ORM_CONFIG } from "./database/ormconfig";
import { AuthModule } from "./modules/auth/auth.module";
import { FollowerModule } from "./modules/followers/follower.module";

@Module({
  imports: [TypeOrmModule.forRoot(ORM_CONFIG), UserModule, AuthModule, FollowerModule],
  controllers: [],
  providers: []
})
export class AppModule {}
