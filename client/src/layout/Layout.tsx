import React from 'react';
import './Layout.css';
import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';

interface IProps {
  menuItems: string[];
  selectedGenre: string;
  changeGenre: (menuItem: string) => void;
}

function Layout({ menuItems, selectedGenre, changeGenre }: IProps) {
  return (
    <>
      <div className="sidebar-container">
        <Sidebar
          rootStyles={{
            [`.${sidebarClasses.container}`]: {
              height: '100vh',
            },
          }}
        >
          <Menu
            menuItemStyles={{
              button: ({ active }) => ({
                backgroundColor: active ? '#f3f3f3' : undefined,
              }),
            }}
          >
            {menuItems.map((menuItem) => (
              <MenuItem
                key={menuItem}
                active={menuItem === selectedGenre ? true : false}
                onClick={() => {
                  changeGenre(menuItem);
                }}
              >
                {menuItem}
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
