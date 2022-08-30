import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

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
  ) {}

  async deleteOne(id: string): Promise<void> {
    await this.booksRepository.delete(id);
  }

  async findById(id: string): Promise<BooksEntity> {
    const cachedBook = await this.cacheManager.get<BooksEntity>(`book-${id}`);
    console.log(cachedBook);

    const book: BooksEntity = await this.booksRepository.findOne({
      where: {
        id
      }
    });

    await this.cacheManager.set(`book-${id}`, JSON.stringify(book));

    return book;
  }

  async findByName(name: string): Promise<BooksEntity> {
    return await this.booksRepository.findOne({
      where: {
        name
      }
    });
  }

  async insertOne(data: iCreateBookProps): Promise<BooksEntity> {
    const book: BooksEntity = this.booksRepository.create(data);

    await this.cacheManager.set(`book-${book.id}`, JSON.stringify(book));

    return this.booksRepository.save(book);
  }

  async list(): Promise<BooksEntity[]> {
    return await this.booksRepository.find();
  }

  async updateOne(data: iUpdateBookProps): Promise<BooksEntity> {
    const book: BooksEntity = await this.findById(data.id);

    this.booksRepository.merge(book, data);

    return await this.booksRepository.save(book);
  }
}