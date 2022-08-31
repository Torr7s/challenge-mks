import { Response } from 'express';
import { 
  Controller, 
  Body, 
  Res, 
  Put,
  Param,
  ParseUUIDPipe
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiBody, 
  ApiResponse 
} from '@nestjs/swagger';

import { UpdateBookService } from './update-book.service';

import { UpdateBookDto } from '@modules/books/domain/dtos/update-book.dto';

import { BookResponse } from '@modules/books/domain/swagger/responses/book';
import { BooksEntity } from '@modules/books/infra/typeorm/entities/books.entity';

@ApiTags('Books')
@Controller('/api/books')
export class UpdateBookController {
  constructor(private updateBookService: UpdateBookService) {};

  @ApiOperation({ description: 'Create a new book' })
  @ApiBody({ type: UpdateBookDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Book successfully created', 
    type: BookResponse
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Book already exists' 
  })

  @Put('/:id')
  async handle(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateBookDto, 
    @Res() response: Response
  ): Promise<Response> {
    const book: BooksEntity = await this.updateBookService.perform(id, data);

    return response.json(book);
  }
}