import React, { useState } from 'react';
import BookList from '../../components/BookList/BookList';
import SideQuote from '../../components/SideQuote/SideQuote';
import Layout from '../../layout/Layout';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useProSidebar } from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Home.css';
import { useMediaQuery } from 'react-responsive';
import genres from '../../data/genres';

function Home() {
  const [selectedGenre, setSelectedGenre] = useState('favourites');
  const changeGenre = (menuItem: string) => {
    setSelectedGenre(menuItem);
  };
  const { broken, toggleSidebar } = useProSidebar();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  return (
    <>
      {broken && (
        <div className="sidebar-broken-header flex-row">
          <FontAwesomeIcon className="collapse-icon" icon={faBars} onClick={() => toggleSidebar()} />
          <p className="sidebar-title">Goodreads List</p>
        </div>
      )}

      <div className="flex-row h-100-p">
        <Layout menuItems={genres} selectedGenre={selectedGenre} changeGenre={changeGenre}></Layout>

        <div className={isTabletOrMobile ? 'flex-column' : 'flex-row w-100-p'}>
          <div className={isTabletOrMobile ? 'flex-column' : 'flex-column w-60-p'}>
            <BookList selectedGenre={selectedGenre}></BookList>
          </div>
          <SideQuote selectedGenre={selectedGenre}></SideQuote>
        </div>
      </div>
    </>
  );
}

export default Home;
