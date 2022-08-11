import React from 'react';
import { Navigate, useNavigate } from 'react-router';

const ErrorPage = () => {
  // INTI
  const navigate = useNavigate();

  return (
    <div className="ErrorPage">
      <h1>Something went wrong</h1>
      <button
        className="btn"
        type="button"
        onClick={() => {
          navigate('/');
        }}
      >
        Go Back
      </button>
    </div>
  );
};

export default ErrorPage;
