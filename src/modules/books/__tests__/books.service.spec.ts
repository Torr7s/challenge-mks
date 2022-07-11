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

  /* Delete a book */

  describe('deleteOne', (): void => {
    it('should not be able to delete a non-existent book', async (): Promise<void> => {
      expect(async (): Promise<void> => {
        await service.deleteOne('123abcd');
      }).rejects.toThrow('No book was found.');
    });

    it('should be able to delete a book', async (): Promise<void> => {
      const { id }: BooksEntity = await service.insertOne({
        name: 'test_name',
        author: 'test_author',
        pages: 1,
        url: 'test_url'
      });

      expect(async (): Promise<void> => {
        await service.deleteOne(id);
      }).toBeTruthy();
    });
  });

  /* Create a book */

  describe('insertOne', (): void => {
    it('should not be able to insert a book with name already taken', async (): Promise<void> => {
      await service.insertOne({
        name: 'test_name',
        author: 'test_author',
        pages: 1,
        url: 'test_url'
      });

      expect(async (): Promise<void> => {
        await service.insertOne({
          name: 'test_name',
          author: 'test_author',
          pages: 1,
          url: 'test_url'
        })
      }).rejects.toThrow('Book already exists');
    });

    it('should be able to insert a book', async (): Promise<void> => {
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

  /* Find a book by id */

  describe('findById', (): void => {
    it('should not be able to find a book by an invalid id', async (): Promise<void> => {
      expect(async(): Promise<void> => {
        await service.findById('123abcd');
      }).rejects.toThrow('No book was found.');
    });

    it('should be able to find a book by its id', async (): Promise<void> => {
      const { id }: BooksEntity = await service.insertOne({
        name: 'test_name',
        author: 'test_author',
        pages: 1,
        url: 'test_url'
      });

      const book: BooksEntity = await service.findById(id);

      expect(book).toHaveProperty('createdAt');
    });
  });

  /* Find a book by name */

  describe('findByName', (): void => {
    it('should not be able to find a book by an unregistered name', async (): Promise<void> => {
      expect(async(): Promise<void> => {
        await service.findByName('**test_name');
      }).rejects.toThrow('No book was found.');
    });

    it('should be able to find a book by its name', async (): Promise<void> => {
      const { name }: BooksEntity = await service.insertOne({
        name: 'test_name',
        author: 'test_author',
        pages: 1,
        url: 'test_url'
      });

      const book: BooksEntity = await service.findByName(name);

      expect(book).toHaveProperty('createdAt');
    });
  });

  /* List books */

  describe('list', (): void => {
    it('should not be able to list books for lack of records', async (): Promise<void> => {
      expect(async(): Promise<void> => {
        await service.list();
      }).rejects.toThrow('No books were found.');
    });

    it('should be able to list all books', async (): Promise<void> => {
      await service.insertOne({ name: 'test_name_1', author: 'test_author_1', pages: 1, url: 'test_url_1' });
      await service.insertOne({ name: 'test_name_2', author: 'test_author_2', pages: 2, url: 'test_url_2' });
      await service.insertOne({ name: 'test_name_3', author: 'test_author_3', pages: 3, url: 'test_url_3' });

      const list: BooksEntity[] = await service.list();

      expect(list).toBeDefined();
    });
  });

  /* Update a book */

  describe('updateOne', (): void => {
    it('should not be possible to update an unregistered book.', async (): Promise<void> => {
      expect(async (): Promise<void> => {
        await service.updateOne({
          name: 'test_name',
          author: 'test_author',
          pages: 1,
          url: 'test_url'
        })
      }).rejects.toThrow('No book was found.');
    });

    it('should be possible to update a book', async (): Promise<void> => {
      const book: BooksEntity = await service.insertOne({
        name: 'test_name',
        author: 'test_author',
        pages: 1,
        url: 'test_url'
      });

      const updatedBook: BooksEntity = {
        id: book.id,
        name: 'name_test',
        author: 'author_test',
        pages: 2,
        url: 'url_test',
      }

      await expect(
        service.updateOne({
          id: book.id,
          name: 'name_test',
          author: 'author_test',
          pages: 2,
          url: 'url_test'
        })
      ).resolves.toEqual(updatedBook);
    });
  });
});