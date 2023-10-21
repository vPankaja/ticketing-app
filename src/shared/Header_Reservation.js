import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../components/images/logo.png";
import "./header.css";

function Header_Reservation() {
    const location = useLocation();

  return (
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
  );
}

export default Header_Reservation;
