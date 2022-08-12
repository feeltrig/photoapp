import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// IMPORTS
// main app state
// current time of day function
// default profile photo
import { useMainApp } from '../appstate/appState';
import { getTimeOfDay } from '../functions/getTimeOfDay';
import DefaultPhoto from '../assets/svgs/defaultUserPhoto.svg';
import HeaderLogo from '../assets/svgs/HeaderLogo.svg';

// CLEAN MAIN APP STATE
import { appState } from '../appstate/appState';

const Header = () => {
  // INIT
  // main app state
  // open close menu
  // navigate
  // time of day
  const { mainappstate, setmainappstate } = useMainApp();
  const { userName } = mainappstate;
  const [menuOpen, setmenuOpen] = useState(false);
  const navigate = useNavigate();
  const [timeOfDay, settimeOfDay] = useState('');

  // SET TIME OF DAY EVERY MIN
  useLayoutEffect(() => {
    settimeOfDay(getTimeOfDay());
  }, []);

  // HANDLE MENUBAR
  const handleMenu = () => {
    setmenuOpen(prev => {
      if (prev) {
        return false;
      } else {
        return true;
      }
    });
  };

  // CLICK OUTSIDE TO CLOSE MENU
  useEffect(() => {
    const closeMenu = e => {
      const classtemp = e.path[0].className;

      if (classtemp == 'menu') {
        return;
      } else if (classtemp == 'menuContainer' || classtemp == 'menu-item') {
        setmenuOpen(true);
        return;
      } else {
        setmenuOpen(false);
        return;
      }
    };

    document.body.addEventListener('click', closeMenu);

    return () => {
      document.body.removeEventListener('click', closeMenu);
    };
  }, []);

  const menuobject = [
    { path: '/user/homepage', title: 'Home' },
    { path: '/user/userprofile', title: 'Profile' },
    { path: '/user/contactus', title: 'Contact Us' },
  ];

  // LOGOUT OUT
  const handleLogout = () => {
    setmainappstate(appState);
    navigate('/');
  };

  return (
    <header>
      <nav>
        {/* logo */}
        <div className="logo">
          <img src={HeaderLogo} alt="" />
        </div>

        {/* time of day and username */}
        {mainappstate.userName !== null && (
          <div className="welcomeMessage">
            Welcome, {userName}, {timeOfDay}
          </div>
        )}

        {/* menu */}
        {mainappstate.allowAccess && (
          <div className="menu" onClick={handleMenu}>
            Menu
            <div
              className="menuContainer"
              style={menuOpen ? { display: 'flex' } : { display: 'none' }}
            >
              {menuobject.map((obj, index) => {
                return (
                  <div className="menu-item" key={index}>
                    <Link to={obj.path}>{obj.title}</Link>
                  </div>
                );
              })}
              <div className="menu-item profilePhotoMenu">
                <Link onClick={handleLogout} to={'/'}>
                  {mainappstate.profilePhoto ? (
                    <img src={mainappstate.profilePhoto} alt="userImage" />
                  ) : (
                    <img src={DefaultPhoto} alt="userImage" />
                  )}
                  Logout
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
