import React from 'react';
import './header.css'; // Import your CSS file
import { FaSignInAlt, FaUser } from 'react-icons/fa';

function Header() {
  return (
    <header className="header">
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/014/467/982/small/bus-camper-travel-logo-design-template-with-white-background-vector.jpg"
        alt="Buy on Inventory"
        style={{
          width: '90px',
          height: '90px',
          borderRadius: '50%',
        }}
      />
      <div className="head2" >
        <FaSignInAlt  className="head1  "/>
        <FaUser  className="head1"/>
      </div>
      <nav className="nav">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/addreservation">Reservation</a></li>
          <li><a href="/addbooking">Booking</a></li>
          <li><a href="/allTrains">Train Management</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
