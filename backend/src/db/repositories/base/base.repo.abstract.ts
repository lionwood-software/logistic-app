import { BaseRepoContract } from './base.repo.contract';
import { DeleteResult, Repository } from 'typeorm';
import { FindConditions } from 'typeorm/find-options/FindConditions';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { SaveOptions } from 'typeorm/repository/SaveOptions';
import { ObjectID } from 'typeorm/driver/mongodb/typings';
import { RemoveOptions } from 'typeorm/repository/RemoveOptions';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';

export abstract class BaseRepoAbstract<T> implements BaseRepoContract<T> {
  private readonly context: Repository<T>;
  public readonly TName: string;

  protected constructor(repository: Repository<T>, name: string) {
    this.context = repository;
    this.TName = name;
  }

  public async getAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.context.find(options);
  }

  public async getById(
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<T>,
  ): Promise<T | undefined> {
    return await this.context.findOne(id, options);
  }

  public async getByOptions(
    options?: FindOneOptions<T>,
  ): Promise<T | undefined> {
    return await this.context.findOne(options);
  }

  public async create<D extends DeepPartial<T>>(
    entity: D,
    options?: SaveOptions,
  ): Promise<T> {
    return await this.context.save(entity);
  }

  public async createMany<D extends DeepPartial<T>>(
    entities: D[],
    options?: SaveOptions,
  ): Promise<T[]> {
    return await this.context.save(entities, options);
  }

  public async update(
    criteria: FindConditions<T>,
    partialEntity: QueryDeepPartialEntity<T>,
    options?: FindOneOptions<T>,
  ): Promise<T> {
    await this.context.update(criteria, partialEntity);
    return this.context.findOne(criteria, options);
  }

  public async delete(
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
  ): Promise<DeleteResult> {
    return await this.context.delete(criteria);
  }

  public async deleteByObject(entity: T, options?: RemoveOptions): Promise<T> {
    return await this.context.remove(entity);
  }

  public async deleteByRangeObject(
    entities: T[],
    options?: RemoveOptions,
  ): Promise<T[]> {
    return await this.context.remove(entities);
  }

  public async countAll(condition?: any): Promise<number> {
    return await this.context.count({ where: condition });
  }

  public async clear(): Promise<void> {
    return await this.context.clear();
  }
}
