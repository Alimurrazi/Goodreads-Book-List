import React, { useState } from 'react';
import BookList from '../../components/BookList/BookList';
import SideQuote from '../../components/SideQuote/SideQuote';
import Layout from '../../layout/Layout';

function Home() {
  const genres = [
    {
      title: 'Adventure',
      keyword: 'adventure',
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
  const menuItems = genres.map((genre) => genre.keyword);
  const [selectedGenre, setSelectedGenre] = useState('favourites');
  const changeGenre = (menuItem: string) => {
    setSelectedGenre(menuItem);
    console.log(menuItem);
  };
  return (
    <>
      <div className="flex-row h-100-p">
        <Layout menuItems={menuItems} selectedGenre={selectedGenre} changeGenre={changeGenre}></Layout>

        <div className="flex-column w-60-p">
          <BookList selectedGenre={selectedGenre}></BookList>
        </div>
        <SideQuote></SideQuote>
      </div>
    </>
  );
}

export default Home;
