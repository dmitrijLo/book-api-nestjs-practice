import { Expose } from 'class-transformer';
import { BookEntity } from '../entities/book.entity';
import { IsInt, IsNotEmpty, IsString, Max } from 'class-validator';

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
