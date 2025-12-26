import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
const STORAGE_KEY = "applicant_profile_full";
export default function ProfileA() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Alice Doe",
    role: "Full Stack Developer",
    about: "I am a passionate full stack developer.",
    age: "21",
    location: "Mumbai, India",
    skills: "HTML, CSS, JavaScript",
    experience: "1 year",
    education: {
      institute: "",
      degree: "",
      cgpa: ""
    },
    certifications: "",
    projects: "",
    languages: "",
    photo: "https://images.unsplash.com/photo-1607746882042-944635dfe10e"
  });
  /* Load from localStorage */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setProfile(JSON.parse(saved));
  }, []);
  /* Auto-save + notify sidebar */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    // 🔥 Notify other components (like sidebar)
    window.dispatchEvent(new Event("storage"));
  }, [profile]);
  const handleChange = (key, value) => {
    setProfile({ ...profile, [key]: value });
  };
  const handleEduChange = (key, value) => {
    setProfile({
      ...profile,
      education: { ...profile.education, [key]: value }
    });
  };
  /* Profile photo upload */
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile({ ...profile, photo: reader.result });
    };
    reader.readAsDataURL(file);
  };
  return (
    <div
      style={{
        flex: 1,
        minHeight: "100vh",
        padding: "30px",
        background: "#003847",
        overflowY: "auto",
        overflowX: "hidden"
      }}
    >
      <div
        style={{
          background: "#005f73",
          color: "white",
          width: "100%",
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "30px",
          borderRadius: "16px"
        }}
      >
        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Applicant Profile</h2>
          <Button
            variant="outline-info"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </div>
        {/* PROFILE PIC */}
        <div className="text-center mb-4">
          <img
            src={profile.photo}
            alt="Profile"
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #9bd3dd"
            }}
          />
          {isEditing && (
            <Form.Control
              className="mt-3"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
            />
          )}
          <h4 className="mt-3">{profile.name}</h4>
          <p>{profile.role}</p>
        </div>
        {/* ABOUT */}
        <Section title="About">
          {isEditing ? (
            <Form.Control
              as="textarea"
              rows={3}
              value={profile.about}
              onChange={(e) => handleChange("about", e.target.value)}
            />
          ) : (
            <p>{profile.about || "—"}</p>
          )}
        </Section>
        {/* BASIC INFO */}
        <Section title="Basic Information">
          {isEditing ? (
            <>
              <Form.Control
                className="mb-2"
                value={profile.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Name"
              />
              <Form.Control
                className="mb-2"
                value={profile.role}
                onChange={(e) => handleChange("role", e.target.value)}
                placeholder="Role"
              />
              <Form.Control
                className="mb-2"
                value={profile.age}
                onChange={(e) => handleChange("age", e.target.value)}
                placeholder="Age"
              />
              <Form.Control
                value={profile.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="Location"
              />
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Role:</strong> {profile.role}</p>
              <p><strong>Age:</strong> {profile.age}</p>
              <p><strong>Location:</strong> {profile.location}</p>
            </>
          )}
        </Section>
        {/* SKILLS */}
        <Section title="Skills">
          {isEditing ? (
            <Form.Control
              value={profile.skills}
              onChange={(e) => handleChange("skills", e.target.value)}
            />
          ) : (
            <p>{profile.skills || "—"}</p>
          )}
        </Section>
        {/* EXPERIENCE */}
        <Section title="Experience">
          {isEditing ? (
            <Form.Control
              value={profile.experience}
              onChange={(e) => handleChange("experience", e.target.value)}
            />
          ) : (
            <p>{profile.experience || "—"}</p>
          )}
        </Section>
        {/* EDUCATION */}
        <Section title="Education">
          {isEditing ? (
            <>
              <Form.Control
                className="mb-2"
                value={profile.education.institute}
                onChange={(e) => handleEduChange("institute", e.target.value)}
                placeholder="Institute"
              />
              <Form.Control
                className="mb-2"
                value={profile.education.degree}
                onChange={(e) => handleEduChange("degree", e.target.value)}
                placeholder="Degree"
              />
              <Form.Control
                value={profile.education.cgpa}
                onChange={(e) => handleEduChange("cgpa", e.target.value)}
                placeholder="CGPA"
              />
            </>
          ) : (
            <p>
              {profile.education.institute || "—"} <br />
              {profile.education.degree}{" "}
              {profile.education.cgpa && `(${profile.education.cgpa})`}
            </p>
          )}
        </Section>
        {/* CERTIFICATIONS */}
        <Section title="Certifications">
          {isEditing ? (
            <Form.Control
              as="textarea"
              rows={2}
              value={profile.certifications}
              onChange={(e) => handleChange("certifications", e.target.value)}
            />
          ) : (
            <p>{profile.certifications || "—"}</p>
          )}
        </Section>
        {/* PROJECTS */}
        <Section title="Projects">
          {isEditing ? (
            <Form.Control
              as="textarea"
              rows={3}
              value={profile.projects}
              onChange={(e) => handleChange("projects", e.target.value)}
            />
          ) : (
            <p>{profile.projects || "—"}</p>
          )}
        </Section>
        {/* LANGUAGES */}
        <Section title="Languages">
          {isEditing ? (
            <Form.Control
              placeholder="Languages known"
              value={profile.languages}
              onChange={(e) => handleChange("languages", e.target.value)}
            />
          ) : (
            <p>{profile.languages || "—"}</p>
          )}
        </Section>
        {isEditing && (
          <div className="text-center mt-4">
            <Button variant="info" onClick={() => setIsEditing(false)}>
              Save Profile
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
/* Reusable Section Component */
function Section({ title, children }) {
  return (
    <div className="mb-4">
      <h5 style={{ borderBottom: "1px solid #9bd3dd", paddingBottom: "6px" }}>
        {title}
      </h5>
      <div className="mt-3">{children}</div>
    </div>
  );
}
