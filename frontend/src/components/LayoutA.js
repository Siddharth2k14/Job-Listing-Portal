import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./ApplicantProfile.css";
import "./Layout.css";

const STORAGE_KEY = "applicant_profile_full";

export default function LayoutA() {
  const [profile, setProfile] = useState({
    name: "Applicant",
    role: "Job Seeker",
    image: ""
  });

  useEffect(() => {
    const loadProfile = () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        setProfile({
          name: data.name || "Applicant",
          role: data.role || "Job Seeker",
          image: data.photo || ""
        });
      }
    };

    // Initial load
    loadProfile();

    // Listen for profile updates
    window.addEventListener("storage", loadProfile);

    return () => {
      window.removeEventListener("storage", loadProfile);
    };
  }, []);

  return (
    <div className="dashboard-container d-flex">
      {/* Sidebar */}
      <div className="sidebar d-flex flex-column justify-content-between">

        {/* TOP: Profile Card */}
        <div>
          <div className="sidebar-profile text-center mb-4">
            <img
              src={
                profile.image ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="profile"
              className="sidebar-profile-img"
            />
            <h5 className="mt-2">{profile.name}</h5>
            <p className="text-info small">{profile.role}</p>
          </div>

          <ul className="nav flex-column mt-4">
            <li className="nav-item">
              <Link to="/DashboardA" className="nav-link">🏠 Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link to="/ProfileA" className="nav-link">🧑 Profile</Link>
            </li>
            <li className="nav-item">
              <Link to="/JobListingsA" className="nav-link">📄 Job Listings</Link>
            </li>
            <li className="nav-item">
              <Link to="/ApplicationsA" className="nav-link">💼 Applications</Link>
            </li>
            <li className="nav-item">
              <Link to="/SettingsA" className="nav-link">⚙ Settings</Link>
            </li>
          </ul>
        </div>

        {/* FOOTER */}
        <div className="sidebar-footer text-center">
          <hr />
          <p className="small mb-1">© 2025 Job Portal</p>
          <p className="small text-secondary">v1.0</p>
        </div>

      </div>

      {/* Page Content */}
      <div className="content-layout">
        <Outlet />
      </div>
    </div>
  );
}
