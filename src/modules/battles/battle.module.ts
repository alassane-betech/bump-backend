import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BattleEntity } from "./entities/Battle.entity";
import { BattleController } from "./Battle.controller";
import { BattleService } from "./services/battle.service";
import { BattleSubmissionService } from "./services/battle-submission.service";
import { BattleSubmissionEntity } from "./entities/battle-submission.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BattleEntity, BattleSubmissionEntity])],
  controllers: [BattleController],
  providers: [BattleService, BattleSubmissionService],
  exports: [BattleService, BattleSubmissionService, TypeOrmModule]
})
export class BattleModule {}
