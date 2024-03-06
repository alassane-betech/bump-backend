import { BaseService } from "src/base/services/base.service";
import { UserEntity } from "./entities/user.entity";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserService extends BaseService<UserEntity> {
  protected name = "app.users";
  protected readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>
  ) {
    super(repository);
  }
}
