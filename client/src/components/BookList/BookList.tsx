import Book from '../Book/Book';
import * as React from 'react';
import { IBook } from '../Book/types';
import BookService from '../../services/Book.service';
import { useEffect, useState } from 'react';
interface IProps {
  selectedGenre: string;
}

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
  }, [selectedGenre]);

  useEffect(() => {
    BookService.getBooksByGenre(selectedGenre, currentPage).then(
      (res) => {
        currentPage === 0 ? setBooks(res.data) : setBooks([...books, ...res.data]);
      },
      (err) => {
        console.log(err);
      },
    );
  }, [currentPage, selectedGenre]);

  return (
    <>
      {books.map((book, index) => (
        <Book bookDetails={book} index={index} key={index}></Book>
      ))}
    </>
  );
}

export default BookList;
