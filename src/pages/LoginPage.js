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
  const { setmainappstate } = useMainApp();

  // GET STATE FROM LOCAL STORAGE
  useEffect(() => {
    const appstate = localStorage.getItem('userProfile');
    if (appstate) {
      setmainappstate(JSON.parse(appstate));
    }
  }, []);

  // HANDLE INPUT
  const handleInput = e => {
    const name = e.target.name;
    const targetvalue = e.target.value;

    console.log(userProfile);

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
  const handleLogin = () => {
    const savedUserProfile = localStorage.getItem('userProfile');
    if (savedUserProfile) {
      if (
        savedUserProfile.userName == userProfile.userName &&
        savedUserProfile.password == userProfile.password
      ) {
        setmainappstate(prev => {
          return { ...prev, allowAccess: true };
        });

        setUserProfile(cleanLoginProfile);
      }
    }
  };

  return (
    <div className="loginPage">
      <div className="loginModal">
        <form onSubmit={handleLogin}>
          <label htmlFor="userName">Username</label>
          <input type="text" name="userName" onChange={handleInput} />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" onChange={handleInput} />
          <button type="submit">Login</button>
          <button
            type="button"
            onClick={() => {
              navigate('/register');
            }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
