import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/Book';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private bookRepo: Repository<Book>) {}
}
