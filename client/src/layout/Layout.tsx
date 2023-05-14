import React from 'react';
import './Layout.css';
import { Sidebar, Menu, MenuItem, sidebarClasses, useProSidebar } from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IMenuItems } from '../types/types';
import { faBars } from '@fortawesome/free-solid-svg-icons';

interface IProps {
  menuItems: IMenuItems[];
  selectedGenre: string;
  changeGenre: (menuItem: string) => void;
}

function Layout({ menuItems, selectedGenre, changeGenre }: IProps) {
  const { collapseSidebar } = useProSidebar();

  return (
    <>
      <div className="sidebar-container">
        <Sidebar
          breakPoint="lg"
          rootStyles={{
            [`.${sidebarClasses.container}`]: {
              height: '100vh',
              backgroundColor: 'black',
            },
          }}
        >
          <div className="flex-row sidebar-header">
            <FontAwesomeIcon className="collapse-icon" icon={faBars} onClick={() => collapseSidebar()} />
            <p className="sidebar-title">Goodreads List</p>
          </div>

          <Menu
            menuItemStyles={{
              button: ({ active }) => ({
                backgroundColor: active ? 'darkslategrey' : undefined,
                color: 'white',
                textTransform: 'capitalize',
              }),
            }}
          >
            {menuItems.map((menuItem) => (
              <MenuItem
                key={menuItem.title}
                active={menuItem.title === selectedGenre ? true : false}
                onClick={() => {
                  changeGenre(menuItem.title);
                }}
                icon={<FontAwesomeIcon icon={menuItem.icon} />}
              >
                {menuItem.title}
              </MenuItem>
            ))}
          </Menu>
        </Sidebar>
      </div>
      ;
    </>
  );
}
export default Layout;
