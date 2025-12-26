import React, { useEffect, useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "recruiterProfile";

export default function ProfileR() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    designation: "",
    photo: "",

    overview: "",
    industry: "",
    type: "",
    experience: "",
    education: "",
    certifications: "",
    projects: "",
    skills: "",
    languages: "",
    location: "",
    links: "",

    email: "",
    phone: ""
  });

  // -------- Load once --------
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  // -------- Save ONLY on button click --------
  const handleSave = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      window.dispatchEvent(new Event("storage")); // sidebar sync
      setIsEditing(false);
      navigate("/RecruiterDashboard");
    } catch (err) {
      alert("Image too large. Please upload a smaller image.");
    }
  };

  // -------- Image upload (NO autosave) --------
  const compressImage = (file, maxWidth = 300, quality = 0.7) => {
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target.result;
      };

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const scale = maxWidth / img.width;

        canvas.width = maxWidth;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        resolve(canvas.toDataURL("image/jpeg", quality));
      };

      reader.readAsDataURL(file);
    });
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const compressedBase64 = await compressImage(file);

    setProfile(prev => ({
      ...prev,
      photo: compressedBase64
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        minHeight: "100vh",
        backgroundColor: "#003f55",
        color: "white",
        width: "100vh"
      }}
    >
      <Container className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Recruiter Profile</h2>
          <Button variant="info" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </div>

        {/* ================= PROFILE HEADER ================= */}
        <Card className="mb-4 text-center" style={{ backgroundColor: "#004b66" }}>
          <Card.Body>
            <img
              src={
                profile.photo ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="profile"
              style={{ width: 120, height: 120, borderRadius: "50%" }}
            />

            {isEditing && (
              <>
                <Form.Control
                  type="file"
                  accept="image/*"
                  className="mt-3"
                  onChange={handlePhotoChange}
                />

                {/* 🔹 NAME */}
                <Form.Control
                  className="mt-3"
                  placeholder="Full Name"
                  value={profile.name}
                  onChange={e =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                />

                {/* 🔹 DESIGNATION */}
                <Form.Control
                  className="mt-2"
                  placeholder="Designation / Role"
                  value={profile.designation}
                  onChange={e =>
                    setProfile({ ...profile, designation: e.target.value })
                  }
                />
              </>
            )}

            {!isEditing && (
              <>
                <h4 className="mt-3">{profile.name || "—"}</h4>
                <p>{profile.designation || "Recruiter"}</p>
              </>
            )}
          </Card.Body>
        </Card>

        {/* ================= VIEW MODE (SINGLE DIV) ================= */}
        {!isEditing && (
          <Card style={{ backgroundColor: "#005f7f" }}>
            <Card.Body>
              <p><strong>About:</strong> {profile.overview || "Full Stack Developer"}</p>
              <p><strong>Industry:</strong> {profile.industry || "Amdox"}</p>
              <p><strong>Type:</strong> {profile.type || "Private"}</p>
              <p><strong>Experience:</strong> {profile.experience || "7 years"}</p>
              <p><strong>Education:</strong> {profile.education || "M.Tech"}</p>
              <p><strong>Certifications:</strong> {profile.certifications || "Web Development"}</p>
              <p><strong>Projects:</strong> {profile.projects || "Web Development"}</p>
              <p><strong>Skills:</strong> {profile.skills || "Web Development"}</p>
              <p><strong>Languages:</strong> {profile.languages || "English"}</p>
              <p><strong>Location:</strong> {profile.location || "Banglore"}</p>
              <p><strong>Web / Links:</strong> {profile.links || "https://boris77Portfolio/github.com"}</p>
              <p><strong>Email:</strong> {profile.email || "boris77@gmail.com"}</p>
              <p><strong>Phone:</strong> {profile.phone || "+91 123 324 2343"}</p>
            </Card.Body>
          </Card>
        )}

        {/* ================= EDIT MODE ================= */}
        {isEditing && (
          <Card style={{ backgroundColor: "#005f7f" }}>
            <Card.Body>
              {[
                ["About / Overview", "overview"],
                ["Industry", "industry"],
                ["Type", "type"],
                ["Experience", "experience"],
                ["Education", "education"],
                ["Certifications", "certifications"],
                ["Projects", "projects"],
                ["Skills", "skills"],
                ["Languages", "languages"],
                ["Location", "location"],
                ["Web / Profile Links", "links"],
                ["Email", "email"],
                ["Phone", "phone"]
              ].map(([label, key]) => (
                <Form.Group className="mb-3" key={key}>
                  <Form.Label>{label}</Form.Label>
                  <Form.Control
                    value={profile[key]}
                    onChange={e =>
                      setProfile({ ...profile, [key]: e.target.value })
                    }
                  />
                </Form.Group>
              ))}

              <div className="text-center">
                <Button variant="success" onClick={handleSave}>
                  Save Profile
                </Button>
              </div>
            </Card.Body>
          </Card>
        )}
      </Container>
    </motion.div>
  );
}
