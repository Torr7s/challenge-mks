import { BadRequestException } from '@nestjs/common';

export class BookException extends BadRequestException {}

export class BookNotFoundException extends BookException {
  constructor() {
    super(
      'Invalid book ID provided.',
      'No book with this name was found in the system.'
    );
  }
}

export class BooksNotFoundException extends BookException {
  constructor() {
    super(
      'No books were found.',
      'There are not books record in the system.'
    );
  }
}

export class BookExistsException extends BookException {
  constructor() {
    super(
      'Book already exists.',
      'A book with the same name is already registered in the system.'
    );
  }
}