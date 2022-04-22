import { DeleteResult } from 'typeorm';
import { FindConditions } from 'typeorm/find-options/FindConditions';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { SaveOptions } from 'typeorm/repository/SaveOptions';
import { ObjectID } from 'typeorm/driver/mongodb/typings';
import { RemoveOptions } from 'typeorm/repository/RemoveOptions';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { FindOneOptions } from 'typeorm/browser';

export interface BaseRepoContract<T> {
  getAll(): Promise<T[]>;

  getById(id: number): Promise<T>;

  getByOptions(options?: FindOneOptions<T>): Promise<T>;

  create<D extends DeepPartial<T>>(
    entity: D,
    options?: SaveOptions,
  ): Promise<T>;

  update<D = T>(
    criteria: FindConditions<T>,
    partialEntity: QueryDeepPartialEntity<T>,
  ): Promise<T>;

  delete(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectID
      | ObjectID[]
      | FindConditions<T>,
  ): Promise<DeleteResult>;

  deleteByObject(entity: T, options?: RemoveOptions): Promise<T>;

  deleteByRangeObject(entities: T[], options?: RemoveOptions): Promise<T[]>;

  countAll(condition?: any): Promise<number>;

  clear(): Promise<void>;
}
