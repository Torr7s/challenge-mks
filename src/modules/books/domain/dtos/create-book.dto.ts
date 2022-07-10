import { ApiProperty } from '@nestjs/swagger';
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

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  pages: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  url: string;
}