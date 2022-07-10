import { BooksEntity } from '@modules/books/infra/typeorm/entities/books.entity';

export interface iCreateBookProps extends BooksEntity {};

export interface iUpdateBookProps extends Partial<iCreateBookProps> {};