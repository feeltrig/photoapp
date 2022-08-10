import React from 'react';

const PageButton = ({ text, setcurrentPage }) => {
  return (
    <div
      onClick={() => {
        setcurrentPage(text - 1);
      }}
    >
      {text}
    </div>
  );
};

export default PageButton;
