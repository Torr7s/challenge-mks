import { Injectable } from '@nestjs/common';

import { iCreateBookProps, iUpdateBookProps } from '@types';

import { 
  BookExistsException,
  BookNotFoundException, 
  BooksNotFoundException, 
} from '@shared/exceptions/books';

import { BooksEntity } from './infra/typeorm/entities/books.entity';
import { BooksRepository } from './infra/typeorm/repositories/books.repository';

@Injectable()
export class BooksService {
  constructor(private booksRepository: BooksRepository) {};

  /* Delete a book */

  async deleteOne(id: string): Promise<void> {
    const book: BooksEntity = await this.findById(id);

    return await this.booksRepository.deleteOne(book.id);
  }

  /* Find a book by its id */

  async findById(id: string): Promise<BooksEntity> {
    const bookData: BooksEntity = await this.booksRepository.findById(id);

    if (!bookData) throw new BookNotFoundException();

    return bookData;
  }

    /* Find a book by its name */

  async findByName(name: string): Promise<BooksEntity> {
    const bookData: BooksEntity = await this.booksRepository.findByName(name);

    if (!bookData) throw new BookNotFoundException();

    return bookData;
  }

  /* Create a book */

  async insertOne(data: iCreateBookProps): Promise<BooksEntity> {
    const bookData: BooksEntity = await this.booksRepository.findByName(data.name);

    if (bookData) throw new BookExistsException();

    return await this.booksRepository.insertOne(data);
  }

    /* List all books */

  async list(): Promise<BooksEntity[]> {
    const booksData: BooksEntity[] = await this.booksRepository.list();

    if (!booksData.length) throw new BooksNotFoundException();

    return booksData;
  }

    /* Update a book */

  async updateOne(data: iUpdateBookProps): Promise<BooksEntity> {
    await this.findById(data.id);

    return await this.booksRepository.updateOne(data);
  }
}