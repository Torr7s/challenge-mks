import { Injectable } from '@nestjs/common';

import { iCreateBookProps } from '@types';

import { BooksEntity } from '@modules/books/infra/typeorm/entities/books.entity';
import { BooksRepository } from '@modules/books/infra/typeorm/repositories/books.repository';

import { BookExistsException } from '@shared/exceptions/books';

@Injectable()
export class CreateBookService {
  constructor(private booksRepository: BooksRepository) {};

  async perform(data: iCreateBookProps): Promise<BooksEntity> {
    const book: BooksEntity = await this.booksRepository.findByName(data.name);

    if (book) throw new BookExistsException();

    return this.booksRepository.insertOne(data);
  }
}