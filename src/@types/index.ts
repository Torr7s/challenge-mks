import { BooksEntity } from '@modules/books/infra/typeorm/entities/books.entity';

export interface iCreateBookProps extends Omit<BooksEntity, 'id' | 'createdAt' | 'updatedAt'> {};

export interface iUpdateBookProps extends Partial<iCreateBookProps> {};