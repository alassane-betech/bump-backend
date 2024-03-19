import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/base/services/base.service";
import { Repository } from "typeorm";
import { VoteEntity } from "../entities/vote.entity";

@Injectable()
export class VoteService extends BaseService<VoteEntity> {
  protected readonly logger = new Logger(VoteService.name);

  constructor(
    @InjectRepository(VoteEntity)
    private repository: Repository<VoteEntity>
  ) {
    super(repository);
  }
}
