import { Injectable } from '@nestjs/common';

import { BooksEntity } from '@modules/books/infra/typeorm/entities/books.entity';
import { BooksRepository } from '@modules/books/infra/typeorm/repositories/books.repository';

import { BookNotFoundException } from '@shared/exceptions/books';

@Injectable()
export class DeleteBookService {
  constructor(private booksRepository: BooksRepository) {};

  async perform(id: string): Promise<void> {
    const book: BooksEntity = await this.booksRepository.findById(id);

    if (!book) throw new BookNotFoundException();

    return this.booksRepository.deleteOne(id);
  }
}