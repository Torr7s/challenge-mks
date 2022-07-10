import { Entity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('books')
export class BooksEntity {
  @Column({ primary: true, type: 'uuid' })
  id?: string;

  @Column()
  name: string;

  @Column()
  author: string;

  @Column({ type: 'int' })
  pages: number;

  @Column()
  url: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}