import { Response } from 'express';
import { 
  Controller, 
  Post, 
  Body, 
  Res 
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiBody, 
  ApiResponse 
} from '@nestjs/swagger';

import { UpdateBookService } from './update-book.service';

import { CreateBookDto } from '@modules/books/domain/dtos/create-book.dto';

import { BookResponse } from '@modules/books/domain/swagger/responses/book';
import { BooksEntity } from '@modules/books/infra/typeorm/entities/books.entity';

@ApiTags('Books')
@Controller('/api/books')
export class UpdateBookController {
  constructor(private updateBookService: UpdateBookService) {};

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
    const book: BooksEntity = await this.updateBookService.perform(data);

    return response.json(book);
  }
}