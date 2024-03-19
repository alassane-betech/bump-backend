import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VoteEntity } from "./entities/vote.entity";
import { VoteController } from "./vote.controller";
import { VoteService } from "./services/vote.service";

@Module({
  imports: [TypeOrmModule.forFeature([VoteEntity])],
  controllers: [VoteController],
  providers: [VoteService],
  exports: [VoteService, TypeOrmModule]
})
export class VoteModule {}
