import React, { useLayoutEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// IMPORTS
// main app state
// current time of day function
// default profile photo
import { useMainApp } from '../appstate/appState';
import { getTimeOfDay } from '../functions/getTimeOfDay';
import DefaultPhoto from '../assets/svgs/defaultUserPhoto.svg';

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
      return !prev;
    });
  };

  // CLICK OUTSIDE TO CLOSE MENU
  // window.addEventListener('click', e => {
  //   console.log(e.target.closest('#menu') == null);

  //   if (e.target.className !== 'menu') {
  //     if (
  //       e.target.className !== 'menu-item' &&
  //       e.target.closest('#menu') == null
  //     ) {
  //       setmenuOpen(false);
  //       return;
  //     } else {
  //       return;
  //     }
  //   } else if (e.target.className == 'menu') {
  //     setmenuOpen(true);
  //     return;
  //   }
  // });

  const menuobject = [
    { path: '/user/homepage', title: 'Home' },
    { path: '/user/userprofile', title: 'Profile' },
    { path: '/user/contactus', title: 'Contact Us' },
  ];

  // LOGOUT OUT
  const handleLogout = () => {
    setmainappstate(appState);
    localStorage.clear('userProfile');
    navigate('/');
  };
  return (
    <header>
      <nav>
        {/* logo */}
        <div className="logo">Logo</div>

        {/* time of day and username */}
        {mainappstate.userName !== null && (
          <div className="welcomeMessage">
            Welcome, {userName}, {timeOfDay}
          </div>
        )}

        {/* menu */}
        {mainappstate.allowAccess && (
          <div className="menu" id="menu" dropdown-menu onClick={handleMenu}>
            Menu
            <div
              className="menuContainer"
              style={menuOpen ? { display: 'flex' } : { display: 'none' }}
            >
              {menuobject.map((obj, index) => {
                return (
                  <div className="menu-item" dropdown-data key={index}>
                    <Link to={obj.path}>{obj.title}</Link>
                  </div>
                );
              })}
              <div
                className="menu-item profilePhotoMenu"
                onClick={handleLogout}
              >
                {mainappstate.profilePhoto ? (
                  <img src={mainappstate.profilePhoto} alt="userImage" />
                ) : (
                  <img src={DefaultPhoto} alt="userImage" />
                )}
                Logout
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
