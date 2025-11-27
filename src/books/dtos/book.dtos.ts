import { Expose } from 'class-transformer';
import { Book } from '../entities/Book';
import { IsInt, IsNotEmpty, IsString, Max } from 'class-validator';

export class BookInputDto implements Omit<Book, 'id'> {
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
