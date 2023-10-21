import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../components/images/logo.png";
import "./header.css";
import Header_Train from "./Header_Train";

function Header() {
  const location = useLocation();
  const userRole = localStorage.getItem("userRole");
  console.log(userRole);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    window.location.href = '/login';
  };

  // Check if the current path is "/login"
  const isLoginPath = location.pathname === '/login';

  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
      <a className="navbar-brand d-flex align-items-center" href="#">
        <img
          src={logo}
          width="80"
          height="80"
          className="d-inline-block align-top"
          alt="MakeMyTrip Logo"
        />
      </a>
      <span className="site-name">E-TICKET</span>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className={`nav-item ${location.pathname === '/searchtrain' ? 'active' : ''}`}>
            <Link className="nav-link" to="/searchtrain">
              Search Train
            </Link>
          </li>
          {userRole === 'BOfficer' && <Header_Train />}
          {(userRole === 'BOfficer' || userRole === 'TAgent') && (
            <div>
              <li className={`nav-item ${location.pathname === '#' ? 'active' : ''}`}>
                <Link className="nav-link" to="/tablereser">
                  Reservation Management
                </Link>
              </li>
            </div>
          )}
          {(userRole === 'BOfficer' || userRole === 'TAgent') && (
            <div>
              <li className={`nav-item ${location.pathname === '#' ? 'active' : ''}`}>
                <Link className="nav-link" to="/tableprofile">
                  Traveler Management
                </Link>
              </li>
            </div>
          )}
          {userRole === 'BOfficer' && (
            <div>
              <li className={`nav-item ${location.pathname === '/tableuser' ? 'active' : ''}`}>
                <Link className="nav-link" to="/tableuser">
                  User Management
                </Link>
              </li>
            </div>
          )}
          {!isLoginPath && (userRole === 'BOfficer' || userRole === 'TAgent') &&( 
            <li>
              <button className="btn btn-outline-dark btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
