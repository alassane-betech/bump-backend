import { DeleteResult } from "typeorm";

export interface IBaseService<T> {
  create(item: T): Promise<T>;
  update(item: T): Promise<T>;
  softDelete(item: T): Promise<DeleteResult>;
  delete(item: T): Promise<DeleteResult>;
  findById(id: number): Promise<T | null>;
  findAll(query: any): Promise<T[]>;
}
