import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/base/services/base.service";
import { Repository } from "typeorm";
import { MediaEntity } from "./entities/media.entity";

@Injectable()
export class StorageService extends BaseService<MediaEntity> {
  protected readonly logger = new Logger(StorageService.name);

  constructor(
    @InjectRepository(MediaEntity)
    private repository: Repository<MediaEntity>
  ) {
    super(repository);
  }
}
