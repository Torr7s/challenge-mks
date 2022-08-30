import { Injectable } from '@nestjs/common';

import { BooksEntity } from '@modules/books/infra/typeorm/entities/books.entity';
import { BooksRepository } from '@modules/books/infra/typeorm/repositories/books.repository';

@Injectable()
export class DeleteBookService {
  constructor(private booksRepository: BooksRepository ) {};

  async perform(id: string): Promise<void> {
    const book: BooksEntity = await this.booksRepository.findById(id);

    return this.booksRepository.deleteOne(book.id);
  }
}