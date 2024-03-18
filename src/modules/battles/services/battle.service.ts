import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/base/services/base.service";
import { Repository } from "typeorm";
import { BattleEntity } from "../entities/battle.entity";

@Injectable()
export class BattleService extends BaseService<BattleEntity> {
  protected readonly logger = new Logger(BattleService.name);

  constructor(
    @InjectRepository(BattleEntity)
    private repository: Repository<BattleEntity>
  ) {
    super(repository);
  }
}
