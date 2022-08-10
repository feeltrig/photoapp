import React, { useState } from 'react';

const Footer = () => {
  // INIT
  // live time update
  const [currentTime, setcurrentTime] = useState();

  setInterval(() => {
    const d = new Date().toLocaleTimeString();
    setcurrentTime(d);
  }, 1000);

  return (
    <footer>
      <div className="clock">{currentTime}</div>
      <div className="aboutYou">About you</div>
      <div className="footercomponent">Kira Intrilogy</div>
      <div className="footercomponent">Practical Task</div>
    </footer>
  );
};

export default Footer;
