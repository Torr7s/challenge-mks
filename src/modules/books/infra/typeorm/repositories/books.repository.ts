import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { iCreateBookProps, iUpdateBookProps } from '@types';

import { iBooksRepository } from '@modules/books/domain/interfaces/books.interface';

import { BooksEntity } from '../entities/books.entity';

export class BooksRepository implements iBooksRepository {
  constructor(
    @InjectRepository(BooksEntity)
    private booksRepository: Repository<BooksEntity>
  ) { }

  async deleteOne(id: string): Promise<void> {
    await this.booksRepository.delete(id);
  }

  async findOne(id: string): Promise<BooksEntity> {
    return await this.booksRepository.findOneOrFail({
      where: {
        id
      }
    });
  }

  async insertOne(data: iCreateBookProps): Promise<BooksEntity> {
    const book: BooksEntity = this.booksRepository.create(data);

    return await this.booksRepository.save(book);
  }

  async list(): Promise<BooksEntity[]> {
    return await this.booksRepository.find();
  }

  async updateOne({ id, name, author, pages, url }: iUpdateBookProps): Promise<BooksEntity> {
    const book: BooksEntity = await this.findOne(id);

    this.booksRepository.merge(book, { 
      name, 
      author, 
      pages, 
      url 
    });

    return await this.booksRepository.save(book);
  }
}