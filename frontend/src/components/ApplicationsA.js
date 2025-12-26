import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ApplicationsA() {
  const [applications] = useState(() => {
    const savedApps = JSON.parse(localStorage.getItem("applicant_applications") || "[]");
    return savedApps.filter(app => app.source === "listings");
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("applicant_notifications") || "[]");
    return saved;
  });

  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleBadgeClick = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
  };

  useEffect(() => {
    localStorage.setItem("applicant_notifications", JSON.stringify(notifications));
  }, [notifications]);

  return (
    <div className="page-container min-vh-100 p-3" style={{ background: "linear-gradient(135deg, #001f3f, #004f6e)", color: "white" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container position-relative"
      >
        <h2 className="title mb-4 text-center">Applications</h2>

        {/* Notification badge */}
        {unreadCount > 0 && (
          <span
            onClick={handleBadgeClick}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              background: "red",
              borderRadius: "50%",
              width: "25px",
              height: "25px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              color: "white",
              fontWeight: "700"
            }}
            title="Unread recruiter responses"
          >
            {unreadCount}
          </span>
        )}

        {applications.length === 0 ? (
          <p className="text-center text-secondary">No applications submitted from job listings yet.</p>
        ) : (
          <div className="row">
            {applications.map((app, index) => {
              // Check if there is a recruiter response for this job
              const response = notifications.find(n => n.jobTitle === app.jobTitle);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="col-12 col-md-6 mb-3"
                >
                  <div className="card p-3 bg-dark shadow-lg">
                    <h4 className="mb-2 text-info">{app.jobTitle}</h4>
                    <p><strong>Date Applied:</strong> {new Date(app.dateTime).toLocaleString()}</p>
                    {response && (
                      <p><strong>Recruiter Response:</strong> {response.status || "Pending"}</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}
