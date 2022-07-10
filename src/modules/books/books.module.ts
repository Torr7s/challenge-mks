import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BooksEntity } from './infra/typeorm/entities/books.entity';
import { BooksRepository } from './infra/typeorm/repositories/books.repository';

import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BooksEntity
    ])
  ],
  providers: [
    BooksRepository,
    BooksService
  ],
  controllers: [
    BooksController
  ]
})
export class BooksModule {}