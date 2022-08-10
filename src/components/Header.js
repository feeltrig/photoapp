import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMainApp } from '../appstate/appState';

const Header = () => {
  // INIT
  // main app state
  const { mainappstate, setmainappstate } = useMainApp();
  const [menuOpen, setmenuOpen] = useState(false);

  // HANDLE MENUBAR
  const handleMenu = () => {
    setmenuOpen(prev => {
      return !prev;
    });
  };

  const menuobject = [
    { path: '/user/homepage', title: 'Home' },
    { path: '/user/profile', title: 'Profile' },
    { path: '/user/contactus', title: 'Contact Us' },
    { path: '/user/logout', title: 'Logout' },
  ];
  return (
    <header>
      <nav>
        <div className="logo">Logo</div>
        <div className="welcomeMessage">Welcome</div>
        <div className="menu" onClick={handleMenu}>
          Menu
          <div className="menuContainer">
            {menuobject.map((obj, index) => {
              return (
                <div className="menu-item" key={index}>
                  <Link to={obj.path}>{obj.title}</Link>
                </div>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
