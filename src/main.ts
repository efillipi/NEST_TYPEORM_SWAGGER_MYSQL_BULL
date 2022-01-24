import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import uploadConfig from './shared/config/upload';

const API_PORT = process.env.API_PORT;

async function server() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  app.use('/files', express.static(uploadConfig.uploadsFolder));

  await app.listen(API_PORT);
}

server().then(() =>
  console.log(`💻 Starting in http://localhost/:${API_PORT}`),
);
