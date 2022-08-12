import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useMainApp } from '../appstate/appState';

const LoginPage = () => {
  // INIT
  // user profile
  // navigate
  // main app state
  const cleanLoginProfile = { userName: '', password: '' };
  const [userProfile, setUserProfile] = useState(cleanLoginProfile);
  const navigate = useNavigate();
  const { mainappstate, setmainappstate } = useMainApp();

  // HANDLE INPUT
  const handleInput = e => {
    const name = e.target.name;
    const targetvalue = e.target.value;

    if (name == 'userName') {
      setUserProfile(prev => {
        return { ...prev, userName: targetvalue };
      });
      return 0;
    } else if (name == 'password') {
      setUserProfile(prev => {
        return { ...prev, password: targetvalue };
      });
      return 0;
    }
  };

  // HANDLE LOGIN
  const handleLogin = e => {
    e.preventDefault();

    // get local profile and parse it
    const savedUserProfile = localStorage.getItem('userProfile');

    if (savedUserProfile) {
      const parsedProfile = JSON.parse(savedUserProfile);
      if (
        parsedProfile.userName == userProfile.userName &&
        parsedProfile.password == userProfile.password
      ) {
        setmainappstate(prev => {
          return { ...prev, allowAccess: true };
        });

        setUserProfile(cleanLoginProfile);
        navigate('user/homepage');
      } else {
        alert('Please input corrent info');
        setUserProfile(cleanLoginProfile);
        return;
      }
    } else {
      alert('Please input correct info');
      setUserProfile(cleanLoginProfile);
      return;
    }
  };

  return (
    <div className="loginPage register">
      <form onSubmit={handleLogin}>
        {/* username */}
        <label htmlFor="userName">Username</label>
        <input
          type="text"
          name="userName"
          value={userProfile.userName}
          onChange={handleInput}
        />

        {/* password */}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={userProfile.password}
          onChange={handleInput}
        />
        <div className="buttonContainer">
          <button type="submit" className="btn">
            Login
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => {
              navigate('/register');
            }}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
