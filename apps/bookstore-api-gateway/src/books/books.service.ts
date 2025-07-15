import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ClientProxy } from '@nestjs/microservices';
import { BOOKS_PATTERNS } from '@app/contracts/books/patterns';
import { BookDto as ClientBookDto } from '@app/contracts/books/book.dto';
import { BookDto } from './dto/book.dto';
import { BOOKS_CLIENT } from './constants';

@Injectable()
export class BooksService {
  constructor(@Inject(BOOKS_CLIENT) private booksClient: ClientProxy) {}

  private mapBookDto(bookDto: ClientBookDto): BookDto {
    const { id, title } = bookDto;
    return {
      id,
      title,
    };
  }

  create(createBookDto: CreateBookDto) {
    return this.booksClient
      .send(BOOKS_PATTERNS.CREATE, createBookDto)
      .pipe(map(this.mapBookDto));
  }

  findAll() {
    return this.booksClient.send(BOOKS_PATTERNS.FIND_ALL, {});
  }

  findOne(id: number) {
    return this.booksClient.send(BOOKS_PATTERNS.FIND_ONE, id);
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.booksClient.send(BOOKS_PATTERNS.UPDATE, {
      id,
      ...updateBookDto,
    });
  }

  remove(id: number) {
    return this.booksClient.send(BOOKS_PATTERNS.REMOVE, id);
  }
}
