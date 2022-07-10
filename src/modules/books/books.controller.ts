import { Response } from 'express';
import { 
  Controller, 
  Delete, 
  Post, Get,
  Param, Res, Body,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';

import { CreateBookDto } from './domain/dtos/create-book.dto';

import { BooksEntity } from './infra/typeorm/entities/books.entity';

import { BooksService } from './books.service';
import { UpdateBookDto } from './domain/dtos/update-book.dto';

@Controller('/api/books')
export class BooksController {
  constructor(private bookService: BooksService) {};

  /* Delete a book */

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

  @Get('/:id')
  async find(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res() response: Response
  ): Promise<Response> {
    const book: BooksEntity = await this.bookService.findById(id);

    return response.json(book);
  }

  /* Create a book */

  @Post('/')
  async create(
    @Body() data: CreateBookDto,
    @Res() response: Response
  ): Promise<Response> {
    const book: BooksEntity = await this.bookService.insertOne(data);

    return response.json(book);
  }

  /* List all books */

  @Get('/')
  async list(
    @Res() response: Response
  ): Promise<Response> {
    const books: BooksEntity[] = await this.bookService.list();

    return response.json(books);
  }

  /* Update a book */

  @Put('/')
  async update(
    @Body() data: UpdateBookDto,
    @Res() response: Response
  ): Promise<Response> {
    const book: BooksEntity = await this.bookService.updateOne(data);

    return response.json(book);
  }
}