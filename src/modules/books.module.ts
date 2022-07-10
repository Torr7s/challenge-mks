import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BooksEntity } from './books/infra/typeorm/entities/books.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BooksEntity
    ])
  ]
})
export class BooksModule {}