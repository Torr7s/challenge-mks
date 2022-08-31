import { join } from 'path';

import { CacheModule, Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BooksModule } from '@modules/books/books.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 60 * 60 * 24
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'database',
      port: 5432,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [
        join(__dirname, 'modules', '**', 'infra', '**/**', '*.entity.{ts,js}')
      ],
      synchronize: true
    }),
    BooksModule
  ]
})
export class AppModule {}
