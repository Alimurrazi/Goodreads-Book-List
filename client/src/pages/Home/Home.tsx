import React from 'react';
import BookList from '../../components/BookList/BookList';
import SideQuote from '../../components/SideQuote/SideQuote';

function Home() {
  const genres = [
    {
      title: 'Adventure',
      keyword: 'Adventure',
    },
    {
      title: 'Classics',
      keyword: 'classics',
    },
    {
      title: 'Fantasy',
      keyword: 'fantasy',
    },
    {
      title: 'Favourites',
      keyword: 'favourites',
    },
    {
      title: 'History',
      keyword: 'history',
    },
    {
      title: 'Memoir',
      keyword: 'memoir',
    },
    {
      title: 'Nonfiction',
      keyword: 'non-fiction',
    },
    {
      title: 'Novel',
      keyword: 'novel',
    },
    {
      title: 'Science Fiction',
      keyword: 'science-fiction',
    },
    {
      title: 'Thriller',
      keyword: 'thriller',
    },
  ];

  return (
    <>
      <div className="flex-row">
        <div>
          {genres.map((genre) => (
            <div key={genre.keyword}>{genre.title}</div>
          ))}
        </div>

        <div className="flex-column w-60-p">
          <BookList></BookList>
        </div>
        <SideQuote></SideQuote>
      </div>
    </>
  );
}

export default Home;
