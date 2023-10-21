import React from 'react';
import './footer.css'; 
import logo from "../components/images/logo.png";

function Footer() {
  const style = {
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  };

  return (
    <footer className="bg-dark text-center text-white">
  <div className="container p-4 pb-0">
    <section className="mb-2">
      <img
        src={logo}
        width="80"
        height="80"
        className="d-inline-block align-top"
        alt="MakeMyTrip Logo"
      />
      <br />
      <span>E-TICKET</span>
    </section>
  </div>

  <div className="text-center p-3" style={style}>
    © 2023 Copyright:
    <a className="text-white" href="http://localhost:3000/">E-TICKET.com</a>
  </div>
</footer>

  );
}

export default Footer;