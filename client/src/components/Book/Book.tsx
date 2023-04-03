import * as React from 'react';
import './Book.css';

const Book = ({ bookDetails, index }: any) => {
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
        <div className="flex-row">
          <img className="bookCover" src={bookDetails.img} alt="Preview of a Word document: About Us - Overview" />
          <div className="flex-column meta-info justify-center">
            <span>First Published: {bookDetails.firstPublished}</span>
            <span>Rating: {bookDetails.avgRating}</span>
            <span>Votes: {bookDetails.ratings}</span>
            <span>Shelved as Favourite : {bookDetails.totalShelved}</span>
          </div>
        </div>

        <p className="description">{bookDetails.description}</p>
      </div>
    </>
  );
};

export default Book;
