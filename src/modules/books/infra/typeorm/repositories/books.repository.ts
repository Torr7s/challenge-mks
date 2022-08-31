import { InjectRepository } from '@nestjs/typeorm';
import {
  CACHE_MANAGER,
  Inject,
  Injectable
} from '@nestjs/common';

import { Cache } from 'cache-manager';

import { Repository } from 'typeorm';

import { iCreateBookProps, iUpdateBookProps } from '@types';
import { iBooksRepository } from '@modules/books/domain/interfaces/books.interface';

import { BooksEntity } from '../entities/books.entity';

@Injectable()
export class BooksRepository implements iBooksRepository {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(BooksEntity) private booksRepository: Repository<BooksEntity>
  ) {};

  async findById(id: string): Promise<BooksEntity> {
    const cachedBook: string = await this.cacheManager.get<string>(`--book-${id}`);

    if (cachedBook) {
      return (
        JSON.parse(cachedBook) as BooksEntity
      );
    }

    const book: BooksEntity = await this.booksRepository.findOne({
      where: {
        id
      }
    });

    await this.cacheManager.set(`--book-${id}`, JSON.stringify(book));

    return book;
  }

  async findByName(name: string): Promise<BooksEntity> {
    return this.booksRepository.findOne({
      where: {
        name
      }
    });
  }

  async deleteOne(id: string): Promise<void> {
    if (await this.cacheManager.get<string>(`--book-${id}`)) {
      await this.cacheManager.del(`--book-${id}`);
    }

    await this.booksRepository.delete(id);
  }

  async insertOne(data: iCreateBookProps): Promise<BooksEntity> {
    const book: BooksEntity = this.booksRepository.create(data);

    return this.booksRepository.save(book);
  }

  async list(): Promise<BooksEntity[]> {
    const cachedBooks: string = await this.cacheManager.get<string>('books');

    if (cachedBooks) {
      return (
        JSON.parse(cachedBooks) as BooksEntity[]
      );
    }

    const books: BooksEntity[] = await this.booksRepository.find();

    await this.cacheManager.set('books', JSON.stringify(books));

    return books;
  }

  async updateOne(id: string, data: iUpdateBookProps): Promise<BooksEntity> {
    const book: BooksEntity = await this.findById(id);
    const merged: BooksEntity = this.booksRepository.merge(book, data);

    await this.cacheManager.set(`--book-${book.id}`, JSON.stringify(merged));

    return this.booksRepository.save(book);
  }
}