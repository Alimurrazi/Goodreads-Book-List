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
        {/* <p className="description">
          The Hunger Games is a 2008 dystopian novel by the American writer Suzanne Collins. It is written in the
          perspective of 16-year-old Katniss Everdeen, who lives in the future, post-apocalyptic nation of Panem in
          North America. The Capitol, a highly advanced metropolis, exercises political control over the rest of the
          nation. The Hunger Games is an annual event in which one boy and one girl aged 12\u201318 from each of the
          twelve districts surrounding the Capitol are selected by lottery to compete in a televised battle royale to
          the death.\nThe book received critical acclaim from major reviewers and authors. It was praised for its plot
          and character development. In writing The Hunger Games, Collins drew upon Greek mythology, Roman gladiatorial
          games, and contemporary reality television for thematic content. The novel won many awards, including the
          California Young Reader Medal, and was named one of Publishers Weekly's \"Best Books of the Year\" in
          2008.\nThe Hunger Games was first published in hardcover on September 14, 2008, by Scholastic, featuring a
          cover designed by Tim O'Brien. It has since been released in paperback and also as an audiobook and ebook.
          After an initial print of 200,000, the book had sold 800,000 copies by February 2010. Since its release, The
          Hunger Games has been translated into 26 languages, and publishing rights have been sold in 38 territories.
          The novel is the first in The Hunger Games trilogy, followed by Catching Fire (2009) and Mockingjay (2010). A
          film adaptation, directed by Gary Ross and co-written and co-produced by Collins herself, was released in
          2012.\n\n"
        </p> */}
      </div>
    </>
  );
};

export default Book;
