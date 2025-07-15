import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookDto } from './dto/book.dto';

@Injectable()
export class BooksService {
  private books: BookDto[] = [
    {
      id: 1,
      title: 'Title 1',
      author: 'Author 1',
      rating: 3.9,
    },
    {
      id: 2,
      title: 'Title 2',
      author: 'Author 2',
      rating: 4.5,
    },
  ];
  create(createBookDto: CreateBookDto) {
    const newBook: BookDto = {
      ...createBookDto,
      id: this.books.length + 1,
    };

    return newBook;
  }

  findAll() {
    return this.books;
  }

  findOne(id: number) {
    return this.books.find((book: BookDto) => book.id === id);
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    const bookIndex = this.books.findIndex((book: BookDto) => book.id === id);
    if (bookIndex === -1) {
      return null;
    }
    const updatedBook: BookDto = {
      ...this.books[bookIndex],
      ...updateBookDto,
      id: this.books[bookIndex].id,
    };
    this.books.splice(bookIndex, 1, updatedBook);
    return updatedBook;
  }

  remove(id: number) {
    const bookIndex = this.books.findIndex((book: BookDto) => book.id === id);
    if (bookIndex === -1) {
      return null;
    }
    const removedBook = this.books.splice(bookIndex, 1)[0];
    return removedBook;
  }
}
