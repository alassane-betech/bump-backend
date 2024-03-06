export interface IBaseService<T> {
  create(item: T): Promise<T>;
  update(item: T): Promise<T>;
  delete(item: T): Promise<T>;
  findById(id: number): Promise<T | null>;
  findAll(query: any): Promise<any>;
}
