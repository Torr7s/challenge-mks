import { Response } from 'express';
import { 
  Controller, 
  Delete, 
  Post, Get,
  Param, Res, Body,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { 
  ApiBody,
  ApiOperation,
  ApiParam, 
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';

import { BooksService } from './books.service';

import { BooksEntity } from './infra/typeorm/entities/books.entity';

import { CreateBookDto } from './domain/dtos/create-book.dto';
import { UpdateBookDto } from './domain/dtos/update-book.dto';

import { BookResponse } from './domain/swagger/responses/book';

@ApiTags('Books')
@Controller('/api/books')
export class BooksController {
  constructor(private bookService: BooksService) {};

  /* Delete a book */

  @ApiOperation({ description: 'Delete a book by its id' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The book id the be deleted'
  })
  @ApiResponse({ status: 200, description: 'Book successfully deleted' })
  @ApiResponse({ status: 404, description: 'No book was found with the given id' })

  @Delete('/:id')
  async delete(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res() response: Response
  ): Promise<Response> {
    await this.bookService.deleteOne(id);

    return response.json({
      message: 'Book successfully deleted.'
    });
  }

  /* Find a book */

  @ApiOperation({ description: 'Find a book by its id' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The book id to be found'
  })
  @ApiResponse({ status: 200, description: 'Book successfully found', type: BookResponse })
  @ApiResponse({ status: 404, description: 'No book was found with the given id' })

  @Get('/:id')
  async find(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res() response: Response
  ): Promise<Response> {
    const book: BooksEntity = await this.bookService.findById(id);

    return response.json(book);
  }

  /* Create a book */

  @ApiOperation({ description: 'Create a new book' })
  @ApiBody({ type: CreateBookDto })
  @ApiResponse({ status: 200, description: 'Book successfully created', type: BookResponse })
  @ApiResponse({ status: 400, description: 'Book already exists' })

  @Post('/')
  async create(
    @Body() data: CreateBookDto,
    @Res() response: Response
  ): Promise<Response> {
    const book: BooksEntity = await this.bookService.insertOne(data);

    return response.json(book);
  }

  /* List all books */

  @ApiOperation({ description: 'List all books in the system' })
  @ApiResponse({
    status: 200,
    description: 'Books successfully found',
    isArray: true,
    type: BookResponse
  })
  @ApiResponse({ status: 404, description: 'No books were found' })

  @Get('/')
  async list(
    @Res() response: Response
  ): Promise<Response> {
    const books: BooksEntity[] = await this.bookService.list();

    return response.json(books);
  }

  /* Update a book */

  @ApiOperation({ description: 'Update a book data' })
  @ApiBody({ type: BookResponse })
  @ApiResponse({ status: 200, description: 'Book successfully updated', type: BookResponse })
  @ApiResponse({ status: 404, description: 'No book was found with the given id' })

  @Put('/')
  async update(
    @Body() data: UpdateBookDto,
    @Res() response: Response
  ): Promise<Response> {
    const book: BooksEntity = await this.bookService.updateOne(data);

    return response.json(book);
  }
}