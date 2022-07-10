import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

(async (): Promise<void> => {
  const app: INestApplication = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }));

  const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('Swagger Documentation - MKS Backend Challenge')
    .setVersion('3.4.0')
    .addTag('Books')
    .build()

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(8080);
})();