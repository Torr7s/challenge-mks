import { ApiProperty } from '@nestjs/swagger';

import { BooksEntity } from '@modules/books/infra/typeorm/entities/books.entity';

export class BookResponse extends BooksEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  pages: number;

  @ApiProperty()
  url: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}