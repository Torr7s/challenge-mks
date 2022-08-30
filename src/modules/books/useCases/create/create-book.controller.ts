import { Response } from 'express';
import { 
  Body, 
  Controller, 
  Post, 
  Res 
} from '@nestjs/common';
import { 
  ApiBody, 
  ApiOperation, 
  ApiResponse, 
  ApiTags 
} from '@nestjs/swagger';

import { CreateBookService } from './create-book.service';

import { CreateBookDto } from '@modules/books/domain/dtos/create-book.dto';

import { BookResponse } from '@modules/books/domain/swagger/responses/book';
import { BooksEntity } from '@modules/books/infra/typeorm/entities/books.entity';

@ApiTags('Books')
@Controller('/api/books')
export class CreateBookController {
  constructor(private createBookService: CreateBookService) {};

  @ApiOperation({ description: 'Create a new book' })
  @ApiBody({ type: CreateBookDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Book successfully created', 
    type: BookResponse
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Book already exists' 
  })

  @Post('/')
  async handle(
    @Body() data: CreateBookDto, 
    @Res() response: Response
  ): Promise<Response> {
    const book: BooksEntity = await this.createBookService.perform(data);

    return response.json(book);
  }
}