import Book from '../Book/Book';
import * as React from 'react';
import { IBook } from '../Book/types';
import BookService from '../../services/Book.service';
import { useEffect, useState } from 'react';
import Spinner from 'react-spinkit';
import { FluentProvider, teamsDarkTheme, Button } from '@fluentui/react-components';

interface IProps {
  selectedGenre: string;
}

function BookList({ selectedGenre }: IProps) {
  const [books, setBooks] = useState<IBook[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(0);
  const prevSelectedGenre = React.useRef(selectedGenre);

  const onClickNextBtn = () => {
    if (currentPage < 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    let isApiFetchNeeded = true;
    if (prevSelectedGenre.current !== selectedGenre) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (currentPage === 1) {
        isApiFetchNeeded = false;
      }
      setCurrentPage(0);
    }
    if (isApiFetchNeeded) {
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
    }
    prevSelectedGenre.current = selectedGenre;
  }, [selectedGenre, currentPage]);

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
      {books.length > 0 && (
        <div className="flex-row justify-end pr-40 pb-16">
          <div className="fit-content">
            <FluentProvider theme={teamsDarkTheme}>
              <Button appearance="primary" onClick={() => onClickNextBtn()} disabled={currentPage === 1}>
                Next
              </Button>
            </FluentProvider>
          </div>
        </div>
      )}
    </>
  );
}

export default BookList;
