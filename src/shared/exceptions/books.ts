import { BadRequestException, NotFoundException } from '@nestjs/common';

export class BookNotFoundException extends NotFoundException {
  constructor() {
    super(
      'Invalid book ID provided.',
      'No book with this name was found in the system.'
    );
  }
}

export class BooksNotFoundException extends NotFoundException {
  constructor() {
    super(
      'No books were found.',
      'There are not books record in the system.'
    );
  }
}

export class BookExistsException extends BadRequestException {
  constructor() {
    super(
      'Book already exists.',
      'A book with the same name is already registered in the system.'
    );
  }
}