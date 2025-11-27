import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/Book';
import { Repository } from 'typeorm';
import { BookInputDto } from './dtos/book.dtos';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private bookRepo: Repository<Book>) {}

  getAllBooks(): Promise<Book[]> {
    return this.bookRepo.find();
  }

  getBookById(id: string): Promise<Book | null> {
    return this.bookRepo.findOne({ where: { id } });
  }

  createBook(newBook: BookInputDto): Promise<Book> {
    const book = this.bookRepo.create(newBook);
    return this.bookRepo.save(book);
  }

  async updateBook(
    id: string,
    bookFieldsToUpdate: Partial<Book>,
  ): Promise<Book | null> {
    await this.bookRepo.update(id, bookFieldsToUpdate);
    return this.getBookById(id);
  }

  async deleteBook(id: string) {
    await this.bookRepo.delete(id);
  }
}
