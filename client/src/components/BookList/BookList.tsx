import Book from '../Book/Book';
import * as React from 'react';
import { IBook } from '../Book/types';
import BookService from '../../services/Book.service';
import { useEffect, useState } from 'react';
import Pagination from '../Pagination/Pagination';

interface IProps {
  selectedGenre: string;
}

const LIMIT = 25;

function BookList({ selectedGenre }: IProps) {
  const [books, setBooks] = useState<IBook[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    //    BookService.getBooksByGenre(currentPage).then(
    BookService.getBooksByGenre(selectedGenre).then(
      (res) => {
        setBooks(res.data);
      },
      (err) => {
        console.log(err);
      },
    );
  }, [currentPage, selectedGenre]);

  return (
    <>
      {books.map((book, index) => (
        <Book bookDetails={book} index={currentPage * LIMIT + index} key={index}></Book>
      ))}
      {books.length > 0 && <Pagination setCurrentPage={setCurrentPage}></Pagination>}
    </>
  );
}

export default BookList;
