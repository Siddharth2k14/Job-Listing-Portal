import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ApplicantProfile.css";
import { Link } from "react-router-dom";
export default function ApplicantProfile() {
  return (
    <div className="dashboard-container ">

      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="logo mb-4">JobSeeker</h2>
        <ul className="nav flex-column mt-4">
          <li className="nav-item"><Link to="/ApplicantProfile" className="nav-link">🏠 Dashboard</Link></li>
          <li className="nav-item"><Link to="/ProfileA" className="nav-link">🧑 Profile</Link></li>
          <li className="nav-item"><Link to="/JobListingsA" className="nav-link">📄 Job Listings</Link></li>
          <li className="nav-item"><Link to="/DashboardA" className="nav-link">💼 Applications</Link></li>
          <li className="nav-item"><Link to="/SettingsA" className="nav-link">⚙ Settings</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="content ">
        <h2 className="title mb-4">Applicant Dashboard</h2>
        {/* Search Bar */}
        <div className="job-search mb-4 fade-in-delayed">
          <input
            type="text"
            className="form-control search-input"
            placeholder="🔍 Search jobs..."
          />
        </div>

        <div className="row">

          {/* Profile Card */}
          <div className="col-md-4">
            <div className="card profile-card fade-in-delayed">
              <img
                src="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
                className="profile-img"
                alt="Profile"
              />
              <div className="card-body text-center">
                <h4 className="card-title">Alice Doe</h4>
                <p>Full-Stack Developer</p>
                
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="col-md-8">
            <div className="card stats-card fade-in-delayed-2">
              <h5 className="mb-3">Your Activity</h5>
              <div className="row">
                <div className="col-md-4">
                  <div className="stat-box">
                    <h2>12</h2>
                    <p>Applications Sent</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="stat-box">
                    <h2>4</h2>
                    <p>Shortlisted</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="stat-box">
                    <h2>2</h2>
                    <p>Interviews</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Latest Jobs */}
            <div className="card jobs-card fade-in-delayed-3 mt-4">
              <h5>Recommended Jobs</h5>
              <ul className="list-group mt-3">
                <li className="list-group-item job-item">Frontend Developer - Google</li>
                <li className="list-group-item job-item">UI/UX Designer - Microsoft</li>
                <li className="list-group-item job-item">Backend Developer - Amazon</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
