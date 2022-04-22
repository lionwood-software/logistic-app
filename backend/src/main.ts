import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app: INestApplication = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const whitelist = [];

  whitelist.push(`${process.env.CLIENT_URL}`, `${process.env.API_URL}`);

  app.enableCors({
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        // !origin for localhost
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe, Authorization',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
    exposedHeaders: ['Content-Disposition'],
    credentials: true,
  });

  app.use(cookieParser());

  app.setGlobalPrefix('api');
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () =>
    console.log(
      `Server hosting on port: ${PORT} with ${process.env.NODE_ENV} environment`,
    ),
  );
}
bootstrap();
