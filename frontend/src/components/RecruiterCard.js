import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function RecruiterCard() {
  const [profile, setProfile] = useState({
    name: "",
    role: "Recruiter",
    photo: "",
  });

  const location = useLocation();

  // ✅ Always sync with localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem("recruiterProfile");
    const signupName = localStorage.getItem("signupName");

    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);

      setProfile({
        name: parsed.name || signupName || "New Recruiter",

        // 🔥 support both role & designation
        role: parsed.designation || parsed.role || "Recruiter",

        // 🔥 support all image keys
        photo: parsed.photo || parsed.image || parsed.profilePic || "",
      });
    } else {
      setProfile({
        name: signupName || "New Recruiter",
        role: "Recruiter",
        photo: "",
      });
    }
  }, [location.pathname]); // 🔁 re-run after save + navigation

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        className="shadow mb-4 text-center"
        style={{ backgroundColor: "#004b66", color: "white" }}
      >
        <Card.Body>
          <img
            src={
              profile.photo ||
              "https://images.unsplash.com/photo-1560250097-0b93528c311a"
            }
            alt={profile.name}
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid cyan",
              marginBottom: "10px",
            }}
          />
          <h5 style={{ color: "cyan", marginBottom: "0" }}>
            {profile.name}
          </h5>
          <p style={{ marginBottom: "0", fontSize: "0.9rem" }}>
            {profile.role}
          </p>
        </Card.Body>
      </Card>
    </motion.div>
  );
}
