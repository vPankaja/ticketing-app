import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import "./admin.css"

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <div className="row">
        <div className="card">
          <p>Card 1 content</p>
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
        <div className="card">
          <p>Card 2 content</p>
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
        <div className="card">
          <p>Card 3 content</p>
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
        <div className="card">
          <p>Card 4 content</p>
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
