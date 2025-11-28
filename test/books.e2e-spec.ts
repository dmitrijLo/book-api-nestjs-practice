import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from '../src/books/books.controller';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from '../src/books/entities/book.entity';
import { Repository } from 'typeorm';
import request from 'supertest';
import { BooksService } from '../src/books/books.service';

const testBook = {
  title: 'The Great Gatsby',
  author: 'F. Scott Fitzgerald',
  publishedYear: 1925,
};

describe('BooksController (e2e)', () => {
  let app: INestApplication;
  let bookRepo: Repository<BookEntity>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory',
          entities: [BookEntity],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([BookEntity]),
      ],
      controllers: [BooksController],
      providers: [BooksService],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    bookRepo = module.get<Repository<BookEntity>>(
      getRepositoryToken(BookEntity),
    );
  });

  beforeEach(async () => {
    await bookRepo.clear();
  });

  /*
   *
   */

  it('/books (GET) should return an empty array when no books found', async () => {
    return request(app.getHttpServer()).get('/books').expect(200).expect([]);
  });

  it('/books (GET) should return an array with books', async () => {
    await bookRepo.save(bookRepo.create(testBook));
    const response = await request(app.getHttpServer())
      .get('/books')
      .expect(200);

    expect(response.body).toHaveLength(1);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ...testBook,
          id: expect.any(String) as string,
        }),
      ]),
    );
  });

  it('/books (POST) should create a new book and return it', async () => {
    const response = await request(app.getHttpServer())
      .post('/books')
      .send(testBook)
      .expect(201);

    expect(response.body).toEqual(expect.objectContaining(testBook));
    expect(response.body.id).toBeDefined();
  });

  it('/books (POST) should return 400 if title is missing', async () => {
    const book: Partial<BookEntity> = { ...testBook };
    delete book.title;
    return request(app.getHttpServer()).post('/books').send(book).expect(400);
  });

  it('/books/{id} (GET) should return 404 if book not found', async () => {
    return request(app.getHttpServer())
      .get('/books/123e4567-e89b-12d3-a456-426614174000')
      .expect(404);
  });

  it('/books/{id} (GET) with valid id should return a specific book', async () => {
    const book = await bookRepo.save(bookRepo.create(testBook));

    const response = await request(app.getHttpServer())
      .get(`/books/${book.id}`)
      .expect(200);
    expect(response.body).toEqual(expect.objectContaining(book));
  });

  it('/books/{id} (PUT) should update successfully and return the updated book', async () => {
    const book = await bookRepo.save(bookRepo.create(testBook));
    const updatedBook = { ...testBook, author: 'Scott F. Fitzgerald' };

    const response = await request(app.getHttpServer())
      .put(`/books/${book.id}`)
      .send(updatedBook)
      .expect(200);

    expect(response.body).toEqual(expect.objectContaining(updatedBook));
  });

  it('/books/{id} (PUT) should return 404 if book with id not exists', async () => {
    await bookRepo.save(bookRepo.create(testBook));
    const updatedBook = { ...testBook, author: 'Scott F. Fitzgerald' };

    return request(app.getHttpServer())
      .put('/books/123e4567-e89b-12d3-a456-426614174000')
      .send(updatedBook)
      .expect(404);
  });

  it('/books/{id} (PUT) should return 400 if body is empty', async () => {
    const book = await bookRepo.save(bookRepo.create(testBook));

    return request(app.getHttpServer())
      .put(`/books/${book.id}`)
      .send({})
      .expect(400);
  });

  it('/books/{id} (PUT) should NOT update forbidden properties even validation passes', async () => {
    const book = await bookRepo.save(bookRepo.create(testBook));
    await request(app.getHttpServer())
      .put(`/books/${book.id}`)
      .send({ author: 'Max Power', role: 'admin' })
      .expect(200);

    const updatedBook = (await bookRepo.findOneBy({
      id: book.id,
    })) as BookEntity;
    expect(updatedBook.author).toBe('Max Power');
    expect(updatedBook).not.toHaveProperty('role');
  });

  it('/books/{id} should return 204 if book was deleted ', async () => {
    const book = await bookRepo.save(bookRepo.create(testBook));
    await request(app.getHttpServer()).delete(`/books/${book.id}`).expect(204);

    const result = await bookRepo.findOneBy({ id: book.id });
    expect(result).toBeNull();
  });

  it('/books/{id} should return 404 if book was not found', async () => {
    return request(app.getHttpServer())
      .delete('/books/123e4567-e89b-12d3-a456-426614174000')
      .expect(404);
  });

  afterAll(async () => {
    await app.close();
  });
});
