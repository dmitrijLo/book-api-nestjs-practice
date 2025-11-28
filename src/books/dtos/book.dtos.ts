import { Expose } from 'class-transformer';
import { BookEntity } from '../entities/book.entity';
import { IsInt, IsNotEmpty, IsString, Max } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
export class BookInputDto implements Omit<BookEntity, 'id'> {
  @Expose()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  author: string;

  @Expose()
  @IsInt()
  @IsNotEmpty()
  @Max(new Date().getFullYear())
  publishedYear: number;
}

export class UpdateBookDto extends PartialType(BookInputDto) {}
