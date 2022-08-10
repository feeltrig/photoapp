import React from 'react';
import { Navigate, useNavigate } from 'react-router';

const ErrorPage = () => {
  // INTI
  const navigate = useNavigate();

  return (
    <div className="ErrorPage">
      <h3>Something went wrong</h3>
      <button
        className="btn"
        type="button"
        onClick={() => {
          navigate('/');
        }}
      >
        Go back
      </button>
    </div>
  );
};

export default ErrorPage;
