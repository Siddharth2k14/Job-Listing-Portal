import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ApplicantProfile.css";
import "./Dasboard.css"
export default function DashboardA() {
  return (
    <div className="content fade-in">

  <h2 className="title mb-4">Applicant Dashboard</h2>
  
  {/* Search Bar */}
  <div className="job-search mb-4 fade-in-delayed">
    <input
      type="text"
      className="form-control search-input"
      placeholder="🔍 Search jobs..."
    />
  </div>

  {/* Flex container for profile + right side */}
  <div className=" d-flex gap-4">

    {/* Profile Card */}
    <div className="profile-section">
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

    {/* Right side: Stats + Recommended Jobs */}
    <div className="right-section flex-1 d-flex flex-column gap-4">

      {/* Stats */}
      <div className="card stats-card fade-in-delayed-2 d-flex justify-content-between flex-wrap gap-3">
        <div className="stat-box"> 
          <h2>12</h2>
          <p>Applications Sent</p>
        </div>
        <div className="stat-box"> 
          <h2>4</h2>
          <p>Shortlisted</p>
        </div>
        <div className="stat-box"> 
          <h2>2</h2>
          <p>Interviews</p>
        </div>
      </div>

      {/* Recommended Jobs */}
      <div className="card jobs-card fade-in-delayed-3">
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

  );
}
