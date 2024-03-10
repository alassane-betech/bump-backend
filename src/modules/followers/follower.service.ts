import { Injectable, Logger } from "@nestjs/common";
import { BaseService } from "src/base/services/base.service";
import { FollowerEntity } from "./entities/follower.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class FollowerService extends BaseService<FollowerEntity> {
  protected readonly logger = new Logger(FollowerService.name);

  constructor(
    @InjectRepository(FollowerEntity)
    private repository: Repository<FollowerEntity>
  ) {
    super(repository);
  }
}
