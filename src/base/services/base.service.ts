import { HttpException, HttpStatus, Logger } from "@nestjs/common";
import { BaseEntity, DeepPartial, DeleteResult, FindOneOptions, FindOptionsWhere, Repository } from "typeorm";
import { IBaseService } from "../interfaces/base.service.interface";
import { IPage, paginate } from "src/core/pagination";
import { PageOptionsDto } from "src/core/pagination/dto/page-options.dto";

export abstract class BaseService<T extends BaseEntity> implements IBaseService<T> {
  protected readonly logger = new Logger(BaseService.name);

  private baseRepository: Repository<T>;

  protected constructor(baseRepository: Repository<T>) {
    this.baseRepository = baseRepository;
  }

  async create(item: DeepPartial<T>): Promise<T> {
    try {
      const newItem = this.baseRepository.create(item);
      return await this.baseRepository.save(newItem);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException("Failed to create item", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(item: DeepPartial<T>): Promise<T> {
    try {
      const savedItem = await this.findById((item as any).id);

      if (!savedItem) {
        throw new HttpException("Item not found", HttpStatus.NOT_FOUND);
      }

      const updatedEntity = this.baseRepository.merge(savedItem, item);

      return await this.baseRepository.save(updatedEntity);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException("Failed to update item", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async softDelete(item: T): Promise<DeleteResult> {
    try {
      const savedItem = await this.findById((item as any).id);

      if (!savedItem) {
        throw new HttpException("Item not found", HttpStatus.NOT_FOUND);
      }

      return await this.baseRepository.softDelete((item as any).id);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException("Failed to delete item", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(item: T): Promise<DeleteResult> {
    try {
      const savedItem = await this.findById((item as any).id);

      if (!savedItem) {
        throw new HttpException("Item not found", HttpStatus.NOT_FOUND);
      }

      return await this.baseRepository.delete((item as any).id);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException("Failed to delete item", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findById(id: string): Promise<T> {
    try {
      const query = { where: { id } } as any;
      return await this.baseRepository.findOne(query);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException("Failed to find item", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Will be refactored to correctly implement pagination, filter and search
  async findAll(query: any = {}): Promise<T[]> {
    try {
      return await this.baseRepository.find(query);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException("Failed to find items", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(options: FindOneOptions<T>): Promise<T> {
    try {
      return await this.baseRepository.findOne(options);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException("Failed to find item", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneBy(where: FindOptionsWhere<T>): Promise<T> {
    try {
      return await this.baseRepository.findOneBy(where);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException("Failed to find item", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async existBy(where: FindOptionsWhere<T>): Promise<boolean> {
    try {
      return await this.baseRepository.existsBy(where);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException("Failed to find item", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async paginate(pageOpttions: PageOptionsDto, where: FindOptionsWhere<T>): Promise<IPage<T>> {
    try {
      return paginate(this.baseRepository, pageOpttions, where);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException("Failed to find items", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
