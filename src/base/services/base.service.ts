import { HttpException, HttpStatus, Logger } from "@nestjs/common";
import { BaseEntity, Repository } from "typeorm";
import { IBaseService } from "../interfaces/base.service.interface";

export abstract class BaseService<T extends BaseEntity> implements IBaseService<T> {
  protected readonly logger = new Logger(BaseService.name);

  private baseRepository: Repository<T>;

  protected constructor(baseRepository: Repository<T>) {
    this.baseRepository = baseRepository;
  }

  async create(item: T): Promise<T> {
    try {
      const savedItem = await this.baseRepository.save(item);
      return savedItem;
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: "An error have occured"
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: e
        }
      );
    }
  }

  async update(item: T): Promise<T> {
    return null;
  }

  async delete(item: T): Promise<T> {
    return null;
  }

  async findById(id: number): Promise<T | null> {
    return null;
  }

  async findAll(query: any): Promise<null> {
    return null;
  }
}
