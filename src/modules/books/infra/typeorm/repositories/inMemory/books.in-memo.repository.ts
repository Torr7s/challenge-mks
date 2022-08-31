import { iBooksRepository } from '@modules/books/domain/interfaces/books.interface';

import { BooksEntity } from '../../entities/books.entity';

import { iCreateBookProps, iUpdateBookProps } from '@types';

export class BooksRepositoryInMemory implements iBooksRepository {
  private books: BooksEntity[] = [];

  async deleteOne(id: string): Promise<void> {
    const bookIndex: number = this.books.findIndex((book: BooksEntity): boolean => book.id === id);

    this.books.splice(bookIndex, 1);
  }

  async findById(id: string): Promise<BooksEntity> {
    return this.books.find((book: BooksEntity): boolean => book.id === id);
  }

  async findByName(name: string): Promise<BooksEntity> {
    return this.books.find((book: BooksEntity): boolean => book.name === name);
  }

  async insertOne(data: iCreateBookProps): Promise<BooksEntity> {
    const book: BooksEntity = new BooksEntity(data);

    this.books.push(book);

    return book;
  }

  async list(): Promise<BooksEntity[]> {
    return this.books;
  }

  async updateOne(id: string, data: iUpdateBookProps): Promise<BooksEntity> {
    const bookIndex: number = this.books.findIndex((book: BooksEntity): boolean => book.id === id);

    this.books[bookIndex] = data as any as BooksEntity;

    return await this.findById(id);
  }
}
