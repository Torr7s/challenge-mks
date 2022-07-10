import { iCreateBookProps, iUpdateBookProps } from '@types';

import { BooksEntity } from '@modules/books/infra/typeorm/entities/books.entity';

export interface iBooksRepository {
  deleteOne(id: string): Promise<void>;
  findById(id: string): Promise<BooksEntity>;
  findByName(name: string): Promise<BooksEntity>;
  insertOne(data: iCreateBookProps): Promise<BooksEntity>;
  list(): Promise<BooksEntity[]>;
  updateOne(data: iUpdateBookProps): Promise<BooksEntity>;
}