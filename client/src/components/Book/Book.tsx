import * as React from 'react';
import './Book.css';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const decode = require('decode-html'); // decode-html has no import function
import parse from 'html-react-parser';
import { IBook } from './types';
import { useMediaQuery } from 'react-responsive';

interface IBookProps {
  bookDetails: IBook;
  index: number;
}

const Book = ({ bookDetails, index }: IBookProps) => {
  const decodedHtmlDescription = decode(bookDetails.description);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="rank">
            <span>{index + 1}</span>
          </div>
          <div className="pb-16">
            <div className="book-title">{bookDetails.title}</div>
            <div className="author">{bookDetails.author}</div>
          </div>
        </div>
        <div className={isTabletOrMobile ? 'flex-column' : 'flex-row'}>
          <img className="bookCover" src={bookDetails.img} alt={bookDetails.title} />
          <div
            className="flex-column meta-info justify-center"
            style={{ marginLeft: isTabletOrMobile ? '0px' : '60px' }}
          >
            <span>First Published: {bookDetails.firstPublished}</span>
            <span>Rating: {bookDetails.avgRating}</span>
            <span>Votes: {bookDetails.ratings.toLocaleString()}</span>
            <div className="flex-row genre-list">
              {bookDetails.genres.map((genre: string) => (
                <span className="genre" key={genre}>
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="description">{parse(decodedHtmlDescription)}</div>
      </div>
    </>
  );
};

export default Book;
