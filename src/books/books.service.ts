import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { Repository } from 'typeorm';
import { BookInputDto } from './dtos/book.dtos';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity) private bookRepo: Repository<BookEntity>,
  ) {}

  getAllBooks(): Promise<BookEntity[]> {
    return this.bookRepo.find();
  }

  getBookById(id: string): Promise<BookEntity | null> {
    return this.bookRepo.findOne({ where: { id } });
  }

  createBook(newBook: BookInputDto): Promise<BookEntity> {
    const book = this.bookRepo.create(newBook);
    return this.bookRepo.save(book);
  }

  async updateBook(
    id: string,
    bookFieldsToUpdate: Partial<BookEntity>,
  ): Promise<BookEntity | null> {
    await this.bookRepo.update(id, bookFieldsToUpdate);
    return this.getBookById(id);
  }

  async deleteBook(id: string) {
    await this.bookRepo.delete(id);
  }
}
