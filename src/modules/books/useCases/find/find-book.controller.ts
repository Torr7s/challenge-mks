import { Response } from 'express';
import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Res
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';

import { FindBookService } from './find-book.service';

import { BookResponse } from '@modules/books/domain/swagger/responses/book';
import { BooksEntity } from '@modules/books/infra/typeorm/entities/books.entity';

@ApiTags('Books')
@Controller('/api/books')
export class FindBookController {
  constructor(private findBookService: FindBookService) {};

  @ApiOperation({ description: 'Find a book by its id' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The book id to be found'
  })
  @ApiResponse({
    status: 200,
    description: 'Book successfully found',
    type: BookResponse
  })
  @ApiResponse({
    status: 404,
    description: 'No book was found with the given id'
  })

  @Get('/:id')
  async handle(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res() response: Response
  ): Promise<Response> {
    const book: BooksEntity = await this.findBookService.findById(id);

    return response.json(book);
  }
}