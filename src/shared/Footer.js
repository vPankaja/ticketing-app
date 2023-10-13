import React from 'react';
import './footer.css'; 
import { FaTwitter, FaGoogle, FaFacebook } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/014/467/982/small/bus-camper-travel-logo-design-template-with-white-background-vector.jpg"
          alt="Buy on Inventory"
          style={{
            width: '90px',
            height: '90px',
            borderRadius: '50%',
          }}
        />
        <div className="footer-links">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="footer-social">
          <a href="#" className="social-icon">Facebook</a>
          <FaFacebook />
          <a href="#" className="social-icon">Twitter</a>
          <FaTwitter />
          <a href="#" className="social-icon">Google</a>
          <FaGoogle />
        </div>
      </div>
      <div className="footer-text">
        &copy; 2023 Your Company. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
