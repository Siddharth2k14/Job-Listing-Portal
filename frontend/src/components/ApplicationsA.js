import React from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ApplicantDashboard() {
  return (
    <div className="page-container">
    <div
      className="min-vh-100 p-3"
      style={{ background: "linear-gradient(135deg, #001f3f, #004f6e)", color: "white" }}
    >
      <h2 className="title mb-4 text-center">Applications</h2>
{/* Job Listings Applications Section */}
<div className="col-12">
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: 0.1 }}
    className="card p-3 bg-dark shadow-lg"
  >
    <h4 className="mb-3 text-info">Job Listings Applications</h4>

    <p className="text-light mb-3">
      These are applications you submitted from the <strong>Job Listings Page</strong>.
    </p>

    {(() => {
      const allApps = JSON.parse(localStorage.getItem("applicant_applications") || "[]");
      const listingApps = allApps.filter(app => app.source === "listings");

      if (listingApps.length === 0) {
        return <p className="text-secondary">No applications submitted from job listings yet.</p>;
      }

      return (
        <ul className="list-group bg-transparent">
          {listingApps.map((app, index) => (
            <li
              key={index}
              className="list-group-item bg-secondary text-white mb-2"
              style={{ borderRadius: "8px" }}
            >
              <strong>Job Title:</strong> {app.jobTitle} <br />
              <strong>Role:</strong> {app.role} <br />
              <strong>Date:</strong>{" "}
              {new Date(app.dateTime).toLocaleString()}
            </li>
          ))}
        </ul>
      );
    })()}
  </motion.div>
</div>

        
    </div>
    </div>
  );
}
