import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../components/images/logo.png";
import "./header.css";

function Header() {
  const location = useLocation();

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
      <span className="site-name">MakeMyTrip</span>
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
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Train Management
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link
                className={`dropdown-item ${location.pathname === '/alltrains' ? 'active' : ''}`}
                to="/alltrains"
              >
                All Train
              </Link>
              <Link
                className={`dropdown-item ${location.pathname === '/addtrain' ? 'active' : ''}`}
                to="/addtrain"
              >
                Add Trains
              </Link>
              <Link
                className={`dropdown-item ${location.pathname === '/trainhistory' ? 'active' : ''}`}
                to="/trainhistory"
              >
                Train History
              </Link>
            </div>
          </li>
          <li className={`nav-item ${location.pathname === '#' ? 'active' : ''}`}>
            <Link className="nav-link" to="/tablereser">
              Reservation Management
            </Link>
          </li>
          <li className={`nav-item ${location.pathname === '#' ? 'active' : ''}`}>
            <Link className="nav-link" to="/tableprofile">
              Traveler Management
            </Link>
          </li>
          <li className={`nav-item ${location.pathname === '#' ? 'active' : ''}`}>
            <Link className="nav-link" to="#">
              User Management
            </Link>
          </li>
          
        </ul>
      </div>
    </nav>
  );
}

export default Header;
