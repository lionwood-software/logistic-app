import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class DbConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(
    connectionName?: string,
  ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('POSTGRES_HOST'),
      port: Number(this.configService.get<string>('POSTGRES_PORT')),
      database: this.configService.get<string>('POSTGRES_DATABASE'),
      username: this.configService.get<string>('POSTGRES_USERNAME'),
      password: this.configService.get<string>('POSTGRES_PASSWORD'),
      synchronize: false,
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/db/migrations/*.js'],
      cli: {
        migrationsDir: 'src/db/migrations',
      },
      namingStrategy: new SnakeNamingStrategy(),
      logging: ['error'],
    };
  }
}
