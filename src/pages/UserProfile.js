import React, { useState } from 'react';
import { useMainApp } from '../appstate/appState';

const UserProfile = () => {
  // INIT
  // main app state
  const { mainappstate, setmainappstate } = useMainApp();
  const [profileImage, setprofileImage] = useState();
  const { userName, fullUserName, email, mobile, password } = mainappstate;

  // STORE PROFILE PHOTO LOCALLY
  const handleProfilePhoto = e => {
    const [file] = e.target.files;
    setprofileImage(URL.createObjectURL(file));
  };

  return (
    <div className="UserProfile">
      <div className="profileCard">
        <div className="profilePhoto">
          <img
            src={profileImage}
            alt="userphoto"
            style={{ width: '10rem', height: '10rem' }}
          />
          <input type="file" onChange={handleProfilePhoto} />
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
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
