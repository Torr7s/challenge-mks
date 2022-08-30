import { Injectable } from '@nestjs/common';

import { BooksEntity } from '@modules/books/infra/typeorm/entities/books.entity';
import { BooksRepository } from '@modules/books/infra/typeorm/repositories/books.repository';

import { BookNotFoundException } from '@shared/exceptions/books';

@Injectable()
export class FindBookService {
  constructor(private booksRepository: BooksRepository) {};

  async findById(id: string): Promise<BooksEntity> {
    const book: BooksEntity = await this.booksRepository.findById(id);

    if (!book) throw new BookNotFoundException();

    return book;
  }

  async findByName(name: string): Promise<BooksEntity> {
    const book: BooksEntity = await this.booksRepository.findByName(name);

    if (!book) throw new BookNotFoundException();

    return book;
  }
}