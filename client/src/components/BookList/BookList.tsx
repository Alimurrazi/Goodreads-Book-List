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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      // Max fetch 20 books
      if (currentPage < 1) {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  useEffect(() => {
    setCurrentPage(0);
    setBooks([]);
  }, [selectedGenre]);

  useEffect(() => {
    BookService.getBooksByGenre(selectedGenre, currentPage).then(
      (res) => {
        setBooks([...books, ...res.data]);
      },
      (err) => {
        console.log(err);
      },
    );
  }, [currentPage]);

  return (
    <>
      {books.map((book, index) => (
        <Book bookDetails={book} index={index} key={index}></Book>
      ))}
      {/* {books.length > 0 && <Pagination setCurrentPage={setCurrentPage}></Pagination>} */}
    </>
  );
}

export default BookList;
