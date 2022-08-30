import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BooksEntity } from './infra/typeorm/entities/books.entity';
import { BooksRepository } from './infra/typeorm/repositories/books.repository';

import { CreateBookService } from './useCases/create/create-book.service';
import { DeleteBookService } from './useCases/delete/delete-book.service';
import { FindBookService } from './useCases/find/find-book.service';
import { ListBooksService } from './useCases/list/list-books.service';
import { UpdateBookService } from './useCases/update/update-book.service';

import { CreateBookController } from './useCases/create/create-book.controller';
import { DeleteBookController } from './useCases/delete/delete-book.controller';
import { FindBookController } from './useCases/find/find-book.controller';
import { ListBooksController } from './useCases/list/list-books.controller';
import { UpdateBookController } from './useCases/update/update-book.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BooksEntity
    ])
  ],
  providers: [
    BooksRepository,
    CreateBookService,
    DeleteBookService,
    FindBookService,
    ListBooksService,
    UpdateBookService
  ],
  controllers: [
    CreateBookController,
    DeleteBookController,
    FindBookController,
    ListBooksController,
    UpdateBookController
  ]
})
export class BooksModule {};