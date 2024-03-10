import { DeleteResult, FindOneOptions, FindOptionsWhere } from "typeorm";

export interface IBaseService<T> {
  create(item: T): Promise<T>;
  update(item: T): Promise<T>;
  softDelete(item: T): Promise<DeleteResult>;
  delete(item: T): Promise<DeleteResult>;
  findById(id: string): Promise<T>;
  findAll(query: any): Promise<T[]>;
  findOne(options: FindOneOptions<T>): Promise<T>;
  findOneBy(where: FindOptionsWhere<T>): Promise<T>;
  existBy(where: FindOptionsWhere<T>): Promise<boolean>;
}
