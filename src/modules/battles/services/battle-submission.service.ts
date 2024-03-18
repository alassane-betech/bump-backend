import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/base/services/base.service";
import { Repository } from "typeorm";
import { BattleEntity } from "../entities/battle.entity";
import { BattleSubmissionEntity } from "../entities/battle-submission.entity";

@Injectable()
export class BattleSubmissionService extends BaseService<BattleSubmissionEntity> {
  protected readonly logger = new Logger(BattleSubmissionService.name);

  constructor(
    @InjectRepository(BattleSubmissionEntity)
    private repository: Repository<BattleSubmissionEntity>
  ) {
    super(repository);
  }
}
