import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('books')
export class BooksEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ unique: true })
  name: string;

  @Column()
  author: string;

  @Column({ type: 'int' })
  pages: number;

  @Column()
  url: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  constructor(book?: Partial<BooksEntity>) {
    this.id = book?.id;
    this.name = book?.name;
    this.pages = book?.pages;
    this.url = book?.url;
    this.createdAt = book?.createdAt;
    this.updatedAt = book?.updatedAt;
  }
}