import React, { useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ApplicantProfile() {
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem("applicant_profile");
    return saved
      ? JSON.parse(saved)
      : {
          name: "Alice Doe",
          age: "21",
          location: "Mumbai, India",
          email: "Alice@example.com",
          phone: "+91 9876543210",
        };
  });

  const [resume, setResume] = useState(() => {
    const savedResume = localStorage.getItem("applicant_resume_name");
    return savedResume ? { name: savedResume } : null;
  });

  const handleChange = (e) => {
    const updated = { ...userData, [e.target.name]: e.target.value };
    setUserData(updated);
    localStorage.setItem("applicant_profile", JSON.stringify(updated));
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    setResume(file);
    if (file) localStorage.setItem("applicant_resume_name", file.name);
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center p-3 page-container"
      style={{ background: "#003847" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container p-4 rounded-4 shadow-lg"
        style={{ background: "#005f73", color: "white", maxWidth: "600px" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="mb-0">Applicant Profile</h2>
          <button
            className="btn btn-outline-info px-3 py-1"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? "Save" : "Edit"}
          </button>
        </div>

        {/* PERSONAL INFO */}
        <h5 className="mb-3">Personal Information</h5>
        {!editMode ? (
          <div className="mb-4">
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Age:</strong> {userData.age}</p>
            <p><strong>Location:</strong> {userData.location}</p>
          </div>
        ) : (
          <div className="mb-4">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              className="form-control bg-dark text-white border-primary mb-2"
            />
            <label className="form-label">Age</label>
            <input
              type="number"
              name="age"
              value={userData.age}
              onChange={handleChange}
              className="form-control bg-dark text-white border-primary mb-2"
            />
            <label className="form-label">Location</label>
            <input
              type="text"
              name="location"
              value={userData.location}
              onChange={handleChange}
              className="form-control bg-dark text-white border-primary"
            />
          </div>
        )}

        {/* CONTACT DETAILS */}
        <h5 className="mb-3">Contact Details</h5>
        {!editMode ? (
          <div className="mb-4">
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Phone:</strong> {userData.phone}</p>
          </div>
        ) : (
          <div className="mb-4">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="form-control bg-dark text-white border-primary mb-2"
            />
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              className="form-control bg-dark text-white border-primary"
            />
          </div>
        )}

        {/* RESUME */}
        <h5 className="mb-3">Resume</h5>
        {!editMode ? (
          <div className="mb-4">
            {resume ? (
              <p><strong>Uploaded:</strong> {resume.name}</p>
            ) : (
              <p className="text-secondary">No resume uploaded</p>
            )}
          </div>
        ) : (
          <div className="mb-4">
            <input
              className="form-control bg-dark text-white border-primary"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeUpload}
            />
            {resume && <p className="mt-2 small">Uploaded: {resume.name}</p>}
          </div>
        )}
      </motion.div>
    </div>
  );
}
