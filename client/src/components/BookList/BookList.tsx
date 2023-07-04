import Book from '../Book/Book';
import * as React from 'react';
import { IBook } from '../Book/types';
import BookService from '../../services/Book.service';
import { useEffect, useState } from 'react';
import Spinner from 'react-spinkit';
interface IProps {
  selectedGenre: string;
}

function BookList({ selectedGenre }: IProps) {
  const [books, setBooks] = useState<IBook[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight + 5 >= scrollHeight) {
      if (currentPage < 1) {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(0);
  }, [selectedGenre]);

  useEffect(() => {
    setIsLoading(true);
    BookService.getBooksByGenre(selectedGenre, currentPage).then(
      (res) => {
        currentPage === 0 ? setBooks(res.data) : setBooks([...books, ...res.data]);
        setIsLoading(false);
      },
      (err) => {
        setIsLoading(false);
        console.log(err);
      },
    );
  }, [currentPage]);

  return (
    <>
      {books.map((book, index) => (
        <Book bookDetails={book} index={index} key={index}></Book>
      ))}
      {isLoading && (
        <div className="w-100-p flex-row justify-center">
          <Spinner name="circle" color="white" style={{ width: 200, height: 200 }} />
        </div>
      )}
    </>
  );
}

export default BookList;
