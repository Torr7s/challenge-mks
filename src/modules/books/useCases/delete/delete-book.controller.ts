import { Response } from 'express';
import {
  Controller,
  Delete,
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

import { DeleteBookService } from './delete-book.service';

@ApiTags('Books')
@Controller('/api/books')
export class DeleteBookController {
  constructor(private deleteBookService: DeleteBookService) {};

  @ApiOperation({ description: 'Delete a book by its id' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The book id the be deleted'
  })
  @ApiResponse({
    status: 200,
    description: 'Book successfully deleted'
  })
  @ApiResponse({
    status: 404,
    description: 'No book was found with the given id'
  })

  @Delete('/:id')
  async handle(
    @Param('id', new ParseUUIDPipe()) id: string, 
    @Res() response: Response
  ): Promise<Response> {
    await this.deleteBookService.perform(id);

    return response.json({
      message: 'Book successfully deleted.'
    });
  }
}