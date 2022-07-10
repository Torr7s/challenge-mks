import { iCreateBookProps, iUpdateBookProps } from '@types';

import { BooksEntity } from '@modules/books/infra/typeorm/entities/books.entity';

export interface iBooksRepository {
  deleteOne(id: string): Promise<void>;
  findOne(id: string): Promise<BooksEntity>;
  insertOne(data: iCreateBookProps): Promise<BooksEntity>;
  list(): Promise<BooksEntity[]>;
  updateOne(data: iUpdateBookProps): Promise<BooksEntity>;
}