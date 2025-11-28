import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  Body,
  Param,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookInputDto, UpdateBookDto } from './dtos/book.dtos';

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

  @Get(':id')
  findBookById(@Param('id') id: string) {
    return this.bookService.getBookById(id);
  }

  @Put(':id')
  updateBook(@Param('id') id: string, @Body() bookPayload: UpdateBookDto) {
    return this.bookService.updateBook(id, bookPayload);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteBook(@Param('id') id: string) {
    return this.bookService.deleteBook(id);
  }
}
