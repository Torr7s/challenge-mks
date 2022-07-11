import { BadRequestException, NotFoundException } from '@nestjs/common';

export class BookNotFoundException extends NotFoundException {
  constructor() {
    super(
      'No book was found.',
      'There are no books registered in the system with this identifier.'
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