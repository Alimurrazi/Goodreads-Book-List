import Book from '../Book/Book';
import * as React from 'react';
import { IBook } from '../Book/types';
import BookService from '../../services/Book.service';
import { useEffect, useState } from 'react';

function BookList() {
  const [books, setBooks] = useState<IBook[]>([]);

  useEffect(() => {
    BookService.getBooks().then(
      (res) => {
        setBooks(res.data);
      },
      (err) => {
        console.log(err);
      },
    );
  }, []);

  return (
    <>
      {books.map((book, index) => (
        <Book bookDetails={book} index={index} key={index}></Book>
      ))}
    </>
  );
}

export default BookList;
