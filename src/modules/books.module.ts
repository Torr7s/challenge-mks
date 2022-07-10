import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BooksEntity } from './books/infra/typeorm/entities/books.entity';
import { BooksRepository } from './books/infra/typeorm/repositories/books.repository';

import { BooksController } from './books/books.controller';
import { BooksService } from './books/books.service';

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