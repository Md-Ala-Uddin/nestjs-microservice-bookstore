import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ClientProxy } from '@nestjs/microservices';
import { BOOKS_PATTERNS } from '@app/contracts/books/patterns';

@Injectable()
export class BooksService {
  constructor(@Inject('BOOKS_CLIENT') private booksClient: ClientProxy) {}

  create(createBookDto: CreateBookDto) {
    return this.booksClient.send(BOOKS_PATTERNS.CREATE, createBookDto);
  }

  findAll() {
    return this.booksClient.send(BOOKS_PATTERNS.FIND_ALL, {});
  }

  findOne(id: number) {
    return this.booksClient.send(BOOKS_PATTERNS.FIND_ONE, id);
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.booksClient.send(BOOKS_PATTERNS.UPDATE, { id, ...updateBookDto });
  }

  remove(id: number) {
    return this.booksClient.send(BOOKS_PATTERNS.REMOVE, id);
  }
}
