import React, { useEffect, useState } from 'react';

import { useMainApp } from '../appstate/appState';

const UserProfile = () => {
  // INIT
  // main app state
  const { mainappstate, setmainappstate } = useMainApp();
  const { userName, fullUserName, email, mobile, password } = mainappstate;

  // FETCH USER PROFILE LOCALLY STORED
  useEffect(() => {
    const localState = localStorage.getItem('userProfile');

    if (localState !== null) {
      const temp = JSON.parse(localState);
      setmainappstate(prev => {
        return { ...prev, ...temp };
      });
    }
  }, []);

  // STORE PROFILE PHOTO LOCALLY
  const handleProfilePhoto = e => {
    const [file] = e.target.files;

    setmainappstate(prev => {
      // save locally
      localStorage.setItem(
        'userProfile',
        JSON.stringify({
          ...prev,
          profilePhoto: URL.createObjectURL(file),
        })
      );

      return { ...prev, profilePhoto: URL.createObjectURL(file) };
    });
  };

  return (
    <div className="UserProfile">
      <div className="profileCard">
        <div className="profilePhoto">
          {mainappstate.profilePhoto && (
            <img src={mainappstate.profilePhoto} alt="userphoto" />
          )}
        </div>
        <div className="userInfo">
          <h3>Full name</h3>
          <p>{fullUserName}</p>
          <h3>User name</h3>
          <p>{userName}</p>
          <h3>Email</h3>
          <p>{email}</p>
          <h3>Mobile</h3>
          <p>{mobile}</p>
          <h3>Password</h3>
          <p>{password}</p>
          <label htmlFor="file">Choose profile Image</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleProfilePhoto}
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
