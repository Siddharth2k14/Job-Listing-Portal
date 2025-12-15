import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function RecruiterCard() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    role: "Recruiter",
    company: "",
    email: "",
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem("recruiterProfile");
    const signupName = localStorage.getItem("signupName"); // from signup

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      setProfile(prev => ({
        ...prev,
        name: signupName || "New Recruiter",
      }));
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        className="shadow mb-4"
        style={{ backgroundColor: "#004b66", color: "white" }}
      >
        <Card.Body>
          <Card.Title style={{ color: "cyan" }}>
            Recruiter Profile
          </Card.Title>

          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Role:</strong> {profile.role}</p>

          {profile.company && (
            <p><strong>Company:</strong> {profile.company}</p>
          )}

          {profile.email && (
            <p><strong>Email:</strong> {profile.email}</p>
          )}

          <Button
            variant="info"
            size="sm"
            onClick={() => navigate("/RecruiterDashboard/ProfileR")}
          >
            Edit Profile
          </Button>
        </Card.Body>
      </Card>
    </motion.div>
  );
}
