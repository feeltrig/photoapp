import React, { useEffect, useState } from 'react';

import { useMainApp } from '../../appstate/appState';

const UserProfile = () => {
  // INIT
  // main app state
  const { mainappstate, setmainappstate } = useMainApp();
  const { userName, fullUserName, email, mobile, password } = mainappstate;

  // STORE PROFILE PHOTO LOCALLY
  const handleProfilePhoto = e => {
    const [file] = e.target.files;
    const profilePic = URL.createObjectURL(file);

    setmainappstate(prev => {
      return { ...prev, profilePhoto: profilePic };
    });
  };

  return (
    <div className="UserProfile">
      <div className="profileCard">
        <div className="userInfo">
          <p>Full name</p>
          <h3>{fullUserName}</h3>
          <p>User name</p>
          <h3>{userName}</h3>
          <p>Email</p>
          <h3>{email}</h3>
          <p>Mobile</p>
          <h3>{mobile}</h3>
          <p>Password</p>
          <h3>{password}</h3>
          <label htmlFor="file">Choose profile Image</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleProfilePhoto}
          />
        </div>

        {/* profile photo */}
        <div className="profilePhoto">
          {mainappstate.profilePhoto && (
            <img src={mainappstate.profilePhoto} alt="userphoto" />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
