import { Injectable } from '@nestjs/common';

import { BooksRepository } from '@modules/books/infra/typeorm/repositories/books.repository';
import { BooksEntity } from '@modules/books/infra/typeorm/entities/books.entity';

import { BooksNotFoundException } from '@shared/exceptions/books';

@Injectable()
export class ListBooksService {
  constructor(private booksRepository: BooksRepository) {};

  async perform(): Promise<BooksEntity[]> {
    const books: BooksEntity[] = await this.booksRepository.list();

    if (!books.length) throw new BooksNotFoundException();

    return books;
  }
}