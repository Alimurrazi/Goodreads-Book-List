import Book from '../Book/Book';
import * as React from 'react';

function BookList() {
  const books = [
    {
      title: 'Harry Potter and the Philosopher’s Stone',
      author: 'J.K. Rowling',
      avgRating: 4.47,
      ratings: 9223787,
      firstPublished: 1997,
      totalShelved: 6488,
      img: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1170803558l/72193.jpg',
      description:
        '&lt;span class=&quot;Formatted&quot;&gt;&lt;b&gt;Could you survive on your own in the wild, with every one out to make sure you don&apos;t live to see the morning?&lt;/b&gt;&lt;br&gt;&lt;br&gt;In the ruins of a place once known as North America lies the nation of Panem, a shining Capitol surrounded by twelve outlying districts. The Capitol is harsh and cruel and keeps the districts in line by forcing them all to send one boy and one girl between the ages of twelve and eighteen to participate in the annual Hunger Games, a fight to the death on live TV.&lt;br&gt;&lt;br&gt;Sixteen-year-old Katniss Everdeen, who lives alone with her mother and younger sister, regards it as a death sentence when she steps forward to take her sister&apos;s place in the Games. But Katniss has been close to dead before—and survival, for her, is second nature. Without really meaning to, she becomes a contender. But if she is to win, she will have to start making choices that weight survival against humanity and life against love.&lt;/span&gt;',
    },
    {
      book: 'The Hunger Games (The Hunger Games, #1)',
      author: 'Suzanne Collins',
      avgRating: 4.33,
      ratings: 7913719,
      firstPublished: 2008,
      totalShelved: 5600,
      img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1586722975l/2767052.jpg',
      description: '',
    },
  ];

  return (
    <>
      {books.map((book, index) => (
        <Book bookDetails={book} index={index} key={index}></Book>
      ))}
    </>
  );
}

export default BookList;
