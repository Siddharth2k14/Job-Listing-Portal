import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import "bootstrap/dist/css/bootstrap.min.css";

export default function JobListings() {
  
  const [jobs, setJobs] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Load job listings (mocked or saved)
    const savedJobs = JSON.parse(localStorage.getItem("job_listings") || "[]");
    setJobs(savedJobs);

    // Load notifications
    const savedNotifications = JSON.parse(localStorage.getItem("applicant_notifications") || "[]");
    setNotifications(savedNotifications);
  }, []);

  const handleApply = (job) => {
    // Save application for applicant
    const applications = JSON.parse(localStorage.getItem("applicant_applications") || "[]");
    const newApp = { ...job, dateTime: new Date().toISOString(), source: "listings" };
    localStorage.setItem("applicant_applications", JSON.stringify([...applications, newApp]));

    // Add recruiter notification
    const recruiterNotifications = JSON.parse(localStorage.getItem("recruiter_notifications") || "[]");
    const newNotif = {
      jobTitle: job.title,
      applicantName: localStorage.getItem("signupName") || "Applicant",
      read: false,
      dateTime: new Date().toISOString()
    };
    localStorage.setItem("recruiter_notifications", JSON.stringify([...recruiterNotifications, newNotif]));

    alert("Applied successfully!");
  };

  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div
      className="min-vh-100 p-3"
      style={{ background: "#003847", color: "white", width: "100vh" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container"
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Available Job Listings</h2>
          <div>
            <span className="badge bg-info text-dark">
              Notifications: {unreadCount}
            </span>
          </div>
        </div>

        <div className="row g-4">
          {jobs.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="col-12 col-md-6"
            >
              <div
                className="p-4 rounded-4 shadow-lg h-100"
                style={{ background: "#005f73" }}
              >
                <h4 className="mb-2 text-info">{job.title}</h4>
                <p className="mb-2"><strong>Description:</strong> {job.description}</p>
                <p className="mb-2"><strong>Qualifications:</strong> {job.qualifications}</p>
                <p className="mb-2"><strong>Responsibilities:</strong> {job.responsibilities}</p>
                <p className="mb-2"><strong>Location:</strong> {job.location}</p>
                <p className="mb-2"><strong>Salary Range:</strong> {job.salary}</p>

                <button
                  className="btn btn-info w-100 fw-bold mt-3 rounded-3"
                  onClick={() => handleApply(job)}
                >
                  Apply Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
