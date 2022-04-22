import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfigService } from './db/db-config.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthMiddleware } from './auth/middlewares/auth.middleware';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { profiles } from './mapper/profiles';
import { MailModule } from './mail/mail.module';
import { OrdersModule } from './orders/orders.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerModule } from './scheduler/scheduler.module';
import { ApiTokenMiddleware } from './auth/middlewares/api-token.middleware';
import { AbilityModule } from './ability/ability.module';
import { MapboxModule } from './mapbox/mapbox.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
      validationSchema: Joi.object({
        // ENV validation
        NODE_ENV: Joi.string()
          .valid('development', 'stage', 'production')
          .default('development'),
        // general validation
        PORT: Joi.number().required(),
        API_URL: Joi.string().required(),
        CLIENT_URL: Joi.string().required(),
        // DB validation
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USERNAME: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DATABASE: Joi.string().required(),
        // AUTH validation
        JWT_ACCESS_SECRET: Joi.string().required(),
        JWT_ACCESS_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        JWT_REFRESH_EXPIRATION_TIME: Joi.string().required(),
        // AWS validation
        AWS_REGION: Joi.string().required(),
        // S3 validation
        AWS_S3_MANAGER_ACCESS_KEY_ID: Joi.string().required(),
        AWS_S3_MANAGER_SECRET_ACCESS_KEY: Joi.string().required(),
        AWS_IMAGES_BUCKET_NAME: Joi.string().required(),
        // Mail validation
        MAIL_HOST: Joi.string().required(),
        MAIL_PORT: Joi.number().required(),
        MAIL_USER: Joi.string().required(),
        MAIL_PASSWORD: Joi.string().required(),
        MAIL_FROM: Joi.string().required(),
        // API_KEY
        API_KEY: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      useClass: DbConfigService,
      inject: [DbConfigService],
      imports: undefined,
    }),
    AutomapperModule.forRoot({
      options: [{ name: 'mapper', pluginInitializer: classes }],
      singular: true,
    }),
    AuthModule,
    UsersModule,
    MailModule,
    OrdersModule,
    AbilityModule,
    MapboxModule,
    SchedulerModule,
  ],
  providers: [DbConfigService, ...profiles],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(ApiTokenMiddleware).forRoutes(
      {
        path: 'orders',
        method: RequestMethod.POST,
      },
      {
        path: 'orders',
        method: RequestMethod.PATCH,
      },
      {
        path: 'orders',
        method: RequestMethod.DELETE,
      },
      {
        path: 'orders/(.*)',
        method: RequestMethod.POST,
      },
    );
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'api/auth/(.*)', method: RequestMethod.ALL },
        {
          path: 'api/mcs/(.*)',
          method: RequestMethod.GET,
        },
        {
          path: 'api/mcs/(.*)',
          method: RequestMethod.POST,
        },
        {
          path: 'api/orders',
          method: RequestMethod.POST,
        },
        {
          path: 'api/orders/:crmId',
          method: RequestMethod.PATCH,
        },
        {
          path: 'api/orders/:crmId',
          method: RequestMethod.DELETE,
        },
        {
          path: 'api/orders/(.*)',
          method: RequestMethod.POST,
        },
      )
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
  }
}
