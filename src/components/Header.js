import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useMainApp } from '../appstate/appState';

// CLEAN MAIN APP STATE
import { appState } from '../appstate/appState';

const Header = () => {
  // INIT
  // main app state
  // navigate
  const { mainappstate, setmainappstate } = useMainApp();
  const [menuOpen, setmenuOpen] = useState(false);
  const navigate = useNavigate();

  // HANDLE MENUBAR
  const handleMenu = () => {
    setmenuOpen(prev => {
      return !prev;
    });
  };

  const menuobject = [
    { path: '/user/homepage', title: 'Home' },
    { path: '/user/userprofile', title: 'Profile' },
    { path: '/user/contactus', title: 'Contact Us' },
  ];

  // LOGOUT OUT
  const handleLogout = () => {
    setmainappstate(appState);
    navigate('/login');
  };
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
            <div className="menu-item" onClick={handleLogout}>
              Logout
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
