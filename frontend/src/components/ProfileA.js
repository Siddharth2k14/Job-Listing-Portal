import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

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
    photo: "",
    resumeFile: null,
    certificationsFile: null,
    publicationsFile: null
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [certFile, setCertFile] = useState(null);
  const [pubFile, setPubFile] = useState(null);
  const [description, setDescription] = useState("");

  const userId = localStorage.getItem("userId");

  // Fetch profile
  useEffect(() => {
    axios.get(`/api/profile/${userId}`)
      .then(res => {
        setProfile(prev => ({ ...prev, ...res.data }));
        setDescription(res.data.description || "");
      })
      .catch(err => console.log(err));
  }, [userId]);

  // Upload resume
  const handleResumeUpload = async () => {
    if (!resumeFile) return;
    const formData = new FormData();
    formData.append("file", resumeFile);

    const res = await axios.post(`/api/profile/uploadResume`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    setProfile(prev => ({
      ...prev,
      resumeFile: res.data
    }));

    alert("Resume uploaded!");
  };

  // Upload certification
  const handleCertUpload = async () => {
    if (!certFile) return;
    const formData = new FormData();
    formData.append("file", certFile);

    const res = await axios.post(`/api/profile/uploadCert`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    setProfile(prev => ({
      ...prev,
      certificationsFile: res.data
    }));

    alert("Certification uploaded!");
  };

  // Upload publication
  const handlePubUpload = async () => {
    if (!pubFile) return;
    const formData = new FormData();
    formData.append("file", pubFile);

    const res = await axios.post(`/api/profile/uploadPublication`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    setProfile(prev => ({
      ...prev,
      publicationsFile: res.data
    }));

    alert("Publication uploaded!");
  };

  // Update description
  const handleDescriptionUpdate = async () => {
    await axios.put(`/api/profile/${userId}`, { description });
    alert("Description updated!");
  };

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  // Auto-save + notify sidebar
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
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

  // Profile photo upload
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
          <h2>My Profile</h2>
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
            <>
              <textarea
                rows={2}
                value={profile.certFile}
                onChange={(e) => handleChange("certifications", e.target.value)}
              />
              <input type="file" onChange={(e) => setCertFile(e.target.files[0])} />
              <button className="btn btn-sm btn-info mt-2" onClick={handleCertUpload}>Upload</button>
            </>
          ) : (
            profile.certFile?.filename ? (
              <a
                href={`/api/profile/file/${profile.certFile.fileId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {profile.certFile.filename}
              </a>
            ) : <p>—</p>
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

        {/* RESUME */}
        <Section title="Resume">
          {isEditing ? (
            <>
              <input type="file" onChange={(e) => setResumeFile(e.target.files[0])} />
              <button className="btn btn-sm btn-info mt-2" onClick={handleResumeUpload}>Upload</button>
            </>
          ) : (
            profile.resumeFile?.filename ? (
              <a
                href={`/api/profile/file/${profile.resumeFile.fileId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {profile.resumeFile.filename}
              </a>
            ) : <p>—</p>
          )}
        </Section>

        {/* PUBLICATIONS */}
        <Section title="Publications">
          {isEditing ? (
            <>
              <textarea
                rows={2}
                value={profile.pubFile}
                onChange={(e) => handleChange("publications", e.target.value)}
              />
              <input type="file" onChange={(e) => setPubFile(e.target.files[0])} />
              <button className="btn btn-sm btn-info mt-2" onClick={handlePubUpload}>Upload</button>
            </>
          ) : (
            profile.pubFile?.filename ? (
              <a
                href={`/api/profile/file/${profile.pubFile.fileId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {profile.pubFile.filename}
              </a>
            ) : <p>—</p>
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

// Reusable Section Component
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
