import {
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookInputDto } from './dtos/book.dtos';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Get()
  allBooks() {
    return this.bookService.getAllBooks();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createBook(@Body() bookPayload: BookInputDto) {
    return this.bookService.createBook(bookPayload);
  }
}
