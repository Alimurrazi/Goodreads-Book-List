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
      if (currentPage < 1) {
        setCurrentPage(currentPage + 1);
      }
      console.log('reach the last section of the page');
      // User has reached the bottom of the page, fetch more books
      //  setDisplayedBooks(prevDisplayedBooks => prevDisplayedBooks + booksToFetch);
    }
  };

  useEffect(() => {
    setCurrentPage(0);
    setBooks([]);
  }, [selectedGenre]);

  useEffect(() => {
    //    BookService.getBooksByGenre(currentPage).then(
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
        <Book bookDetails={book} index={currentPage * LIMIT + index} key={index}></Book>
      ))}
      {/* {books.length > 0 && <Pagination setCurrentPage={setCurrentPage}></Pagination>} */}
    </>
  );
}

export default BookList;
