import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./modules/users/user.module";
import { ORM_CONFIG } from "./database/ormconfig";
import { AuthModule } from "./modules/auth/auth.module";
import { FollowerModule } from "./modules/followers/follower.module";
import { APP_FILTER } from "@nestjs/core";
import { HttpExceptionFilter } from "./exceptions/http-exception.filter";
import { BattleModule } from "./modules/battles/battle.module";
import { VoteModule } from "./modules/votes/vote.module";
import { StorageModule } from "./modules/storages/storage.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(ORM_CONFIG),
    UserModule,
    AuthModule,
    FollowerModule,
    BattleModule,
    VoteModule,
    StorageModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    }
  ]
})
export class AppModule {}
