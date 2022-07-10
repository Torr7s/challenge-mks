import { 
  IsNotEmpty, IsOptional, 
  IsNumber, 
  IsString 
} from 'class-validator';

import { BooksEntity } from '@modules/books/infra/typeorm/entities/books.entity';

export class CreateBookDto extends BooksEntity {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsNumber()
  @IsNotEmpty()
  pages: number;

  @IsString()
  @IsNotEmpty()
  url: string;
}