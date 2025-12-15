import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ProfileR() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    // Employer Info
    name: "",
    role: "Recruiter",
    designation: "",
    resume: "",

    // Company Info
    companyName: "",
    companyAddress: "",
    companyWebsite: "",
    companyDescription: "",

    // Contact Info
    email: "",
    phone: "",
  });

  // ---------------- Load Profile ----------------
  useEffect(() => {
    const savedProfile = localStorage.getItem("recruiterProfile");
    const signupName = localStorage.getItem("signupName");

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      setProfile(prev => ({
        ...prev,
        name: signupName || "",
      }));
    }
  }, []);

  // ---------------- Save Profile ----------------
  const handleSave = () => {
    localStorage.setItem("recruiterProfile", JSON.stringify(profile));
    navigate("/RecruiterDashboard");
  };

  // ---------------- Logout ----------------
  const handleLogout = () => {
    localStorage.removeItem("recruiterProfile");
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ minHeight: "100vh", backgroundColor: "#003f55", color: "white" }}
    >
      <Container className="py-4">
        <h2 className="mb-4">Recruiter Profile</h2>

        {/* ================= Employer Info ================= */}
        <Card className="mb-4 shadow" style={{ backgroundColor: "#004b66" }}>
          <Card.Body>
            <Card.Title style={{ color: "cyan" }}>
              Employer Information
            </Card.Title>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    value={profile.name}
                    onChange={e => setProfile({ ...profile, name: e.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Designation / Role</Form.Label>
                  <Form.Control
                    value={profile.designation}
                    onChange={e => setProfile({ ...profile, designation: e.target.value })}
                    placeholder="HR Manager, Talent Lead..."
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Resume / Portfolio Link</Form.Label>
                  <Form.Control
                    value={profile.resume}
                    onChange={e => setProfile({ ...profile, resume: e.target.value })}
                    placeholder="Google Drive / LinkedIn / Portfolio URL"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* ================= Company Info ================= */}
        <Card className="mb-4 shadow" style={{ backgroundColor: "#005f7f" }}>
          <Card.Body>
            <Card.Title style={{ color: "cyan" }}>
              Company Information
            </Card.Title>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    value={profile.companyName}
                    onChange={e => setProfile({ ...profile, companyName: e.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Company Website</Form.Label>
                  <Form.Control
                    value={profile.companyWebsite}
                    onChange={e => setProfile({ ...profile, companyWebsite: e.target.value })}
                    placeholder="https://company.com"
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Company Address</Form.Label>
                  <Form.Control
                    value={profile.companyAddress}
                    onChange={e => setProfile({ ...profile, companyAddress: e.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Company Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={profile.companyDescription}
                    onChange={e => setProfile({ ...profile, companyDescription: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* ================= Contact Info ================= */}
        <Card className="mb-4 shadow" style={{ backgroundColor: "#006f99" }}>
          <Card.Body>
            <Card.Title style={{ color: "cyan" }}>
              Contact Details
            </Card.Title>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    value={profile.email}
                    onChange={e => setProfile({ ...profile, email: e.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    value={profile.phone}
                    onChange={e => setProfile({ ...profile, phone: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* ================= Buttons ================= */}
        <div className="d-flex justify-content-between">
          <Button variant="success" onClick={handleSave}>
            Save Changes
          </Button>

          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Container>
    </motion.div>
  );
}
