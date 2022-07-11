import { Test, TestingModule } from '@nestjs/testing';

import { BooksService } from '../books.service';
import { BooksEntity } from '../infra/typeorm/entities/books.entity';

import { BooksRepository } from '../infra/typeorm/repositories/books.repository';
import { BooksRepositoryInMemory } from '../infra/typeorm/repositories/inMemory/books.in-memo.repository';

describe('BooksService', (): void => {
  let service: BooksService;

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: BooksRepository,
          useClass: BooksRepositoryInMemory
        }
      ]
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', (): void => {
    expect(service).toBeDefined();
  });

  describe('deleteOne', (): void => {
    it('should not be able to delete a non-existent book', async (): Promise<void> => {
      await expect(service.deleteOne('123abcd'))
        .rejects
        .toThrow('Invalid book ID provided.');
    });

    it('should be able to delete a book', async (): Promise<void> => {
      const book: BooksEntity = await service.insertOne({
        name: 'test_name',
        author: 'test_author',
        pages: 1,
        url: 'test_url'
      });

      expect(service.deleteOne(book.id)).toBeTruthy();
    });
  });

  describe('insertOne', (): void => {
    it('should be able to insert a book', (): void => {
      expect(
        service.insertOne({
          name: 'test_name',
          author: 'test_author',
          pages: 1,
          url: 'test_url'
        })
      ).resolves.toHaveProperty('id');
    });
  });
});