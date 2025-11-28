import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async getBookById(id: string): Promise<BookEntity | null> {
    const book = await this.bookRepo.findOne({ where: { id } });
    if (!book) throw new NotFoundException(`Book with id ${id} not found`);
    return book;
  }

  createBook(newBook: BookInputDto): Promise<BookEntity> {
    const book = this.bookRepo.create(newBook);
    return this.bookRepo.save(book);
  }

  async updateBook(
    id: string,
    bookFieldsToUpdate: Partial<Omit<BookEntity, 'id'>>,
  ): Promise<BookEntity | null> {
    if (!Object.values(bookFieldsToUpdate).some((val) => !!val)) {
      throw new BadRequestException('Body must not be empty');
    }

    await this.bookRepo.update(id, bookFieldsToUpdate);
    return this.getBookById(id);
  }

  async deleteBook(id: string) {
    const { affected } = await this.bookRepo.delete(id);
    if (!affected) throw new NotFoundException(`Book with id ${id} not found`);
  }
}
