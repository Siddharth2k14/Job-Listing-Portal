import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./ApplicantProfile.css";
import "./Layout.css"
export default function LayoutA() {
  return (
    <div className="dashboard-container d-flex">

      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="logo mb-4">JobSeeker</h2>
        <ul className="nav flex-column mt-4">
          <li className="nav-item"><Link to="/DashboardA" className="nav-link">🏠 Dashboard</Link></li>
          <li className="nav-item"><Link to="/ProfileA" className="nav-link">🧑 Profile</Link></li>
          <li className="nav-item"><Link to="/JobListingsA" className="nav-link">📄 Job Listings</Link></li>
          <li className="nav-item"><Link to="/ApplicationsA" className="nav-link">💼 Applications</Link></li>
          <li className="nav-item"><Link to="/SettingsA" className="nav-link">⚙ Settings</Link></li>
        </ul>
      </div>

      {/* Page Content — changes dynamically */}
      <div className="content-layout">
        <Outlet />  
      </div>
    </div>
  );
}
