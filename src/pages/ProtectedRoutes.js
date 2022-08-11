import React, { useLayoutEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useMainApp } from '../appstate/appState';

// PAGES
import ErrorPage from './ErrorPage';
import ContactUs from './ContactUs';
import UserProfile from './UserProfile';
import Home from './Home';

const ProtectedRoutes = () => {
  // INITIALIZATIONS
  // main app state
  // user logged or not
  // navigate hook
  const { mainappstate, setmainappstate } = useMainApp();
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  if (mainappstate.allowAccess) {
    return (
      <Routes>
        <Route path="homepage" element={<Home />} />
        <Route path="contactus" element={<ContactUs />} />

        <Route path="userprofile" element={<UserProfile />} />
      </Routes>
    );
  } else {
    return <ErrorPage />;
  }

  return null;
};

export default ProtectedRoutes;
