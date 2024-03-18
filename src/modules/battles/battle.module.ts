import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BattleEntity } from "./entities/Battle.entity";
import { BattleController } from "./Battle.controller";
import { BattleService } from "./Battle.service";

@Module({
  imports: [TypeOrmModule.forFeature([BattleEntity])],
  controllers: [BattleController],
  providers: [BattleService],
  exports: [BattleService, TypeOrmModule]
})
export class BattleModule {}
