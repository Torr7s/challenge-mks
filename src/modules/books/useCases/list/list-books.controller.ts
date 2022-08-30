import { Response } from 'express';
import { 
  Controller, 
  Get, 
  Res 
} from '@nestjs/common';
import { 
  ApiOperation, 
  ApiResponse, 
  ApiTags 
} from '@nestjs/swagger';

import { ListBooksService } from './list-books.service';

import { BookResponse } from '@modules/books/domain/swagger/responses/book';
import { BooksEntity } from '@modules/books/infra/typeorm/entities/books.entity';

@ApiTags('Books')
@Controller('/api/books')
export class ListBooksController {
  constructor(private listBooksService: ListBooksService) {};

  @ApiOperation({ description: 'List all books in the system' })
  @ApiResponse({
    status: 200,
    description: 'Books successfully found',
    isArray: true,
    type: BookResponse
  })
  @ApiResponse({ 
    status: 404, 
    description: 'No books were found' 
  })

  @Get('/')
  async handle(@Res() response: Response): Promise<Response> {
    const books: BooksEntity[] = await this.listBooksService.perform();

    return response.json(books);
  }

}