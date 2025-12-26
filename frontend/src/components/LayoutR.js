import React from "react";
import { Link, Outlet } from "react-router-dom";
import RecruiterCard from "./RecruiterCard";
import "bootstrap/dist/css/bootstrap.min.css";

export default function LayoutR() {
  return (
    <div className="dashboard-container d-flex" style={{ minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <div
        className="sidebar d-flex flex-column justify-content-between"
        style={{
          width: "250px",
          background: "#003847",
          color: "white",
          padding: "20px",
          flexShrink: 0
        }}
      >
        <div>
          <h2 className="logo mb-4" style={{ color: "cyan" }}>
            Employer
          </h2>

          {/* Recruiter Profile Card */}
          <RecruiterCard />

          {/* Navigation */}
          <ul className="nav flex-column mt-4">
            <li className="nav-item">
              <Link to="/RecruiterDashboard" className="nav-link text-white">
                🏠 Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/RecruiterDashboard/JobListingsR" className="nav-link text-white">
                📄 Job Listings
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/RecruiterDashboard/ApplicationsR" className="nav-link text-white">
                💼 Applications
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/RecruiterDashboard/ProfileR" className="nav-link text-white">
                🧑 Profile
              </Link>
            </li>

            {/* ✅ NEW: Settings */}
            <li className="nav-item">
              <Link to="/RecruiterDashboard/SettingsR" className="nav-link text-white">
                ⚙ Settings
              </Link>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <footer
          style={{
            color: "#9bd3dd",
            fontSize: "0.9rem",
            marginTop: "20px"
          }}
        >
          © 2025 Recruiter Portal • Hire Smarter • Grow Faster
        </footer>
      </div>

      {/* Page Content */}
      <div
        className="content-layout flex-1"
        style={{
          flex: 1,
          minHeight: "100vh",
          background: "#012c40",
          padding: "40px",
          boxSizing: "border-box",
          overflowY: "auto"
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
