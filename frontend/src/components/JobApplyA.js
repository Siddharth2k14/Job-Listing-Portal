import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Fade, Card } from "react-bootstrap";

export default function JobApplyPage() {
  const navigate = useNavigate();
  const [open] = useState(true);

  // Track form inputs
  const [position, setPosition] = useState("");

  // Submit Handler
  const handleSubmit = () => {
    if (!position.trim()) {
      alert("Please enter the position you are applying for.");
      return;
    }

    // Create application entry
    const newApp = {
      jobTitle: position,
      role: position,
      dateTime: new Date().toISOString(),
      source: "listings"
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem("applicant_applications") || "[]");
    existing.push(newApp);
    localStorage.setItem("applicant_applications", JSON.stringify(existing));

    navigate("/SuccessA");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#001f2e", padding: "40px" }}>
      <Container style={{ maxWidth: "800px" }}>
        <Fade in={open}>
          <Card
            style={{
              background: "#012c40",
              color: "white",
              padding: "30px",
              borderRadius: "20px",
              boxShadow: "0 0 20px rgba(0,255,255,0.2)",
            }}
          >
            <h2 className="mb-4 text-center" style={{ color: "cyan" }}>
              Job Application Form
            </h2>
            <Form>
              {/* Personal Info */}
              <h4 style={{ color: "cyan" }}>Personal Information</h4>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter first name" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter last name" />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" placeholder="Enter phone number" />
              </Form.Group>

              {/* Resume */}
              <h4 style={{ color: "cyan" }}>Resume Upload</h4>
              <Form.Group className="mb-3">
                <Form.Label>Upload Resume (PDF/DOC)</Form.Label>
                <Form.Control type="file" />
              </Form.Group>

              {/* Position & Salary */}
              <h4 style={{ color: "cyan" }}>Job Details</h4>
              <Form.Group className="mb-3">
                <Form.Label>Position Applying For</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ex: Frontend Developer"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Expected Salary</Form.Label>
                <Form.Control type="number" placeholder="Enter expected salary" />
              </Form.Group>

              {/* Experience */}
              <h4 style={{ color: "cyan" }}>Experience</h4>
              <Form.Group className="mb-3">
                <Form.Label>Years of Experience</Form.Label>
                <Form.Control type="number" placeholder="Enter years of experience" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Relevant Skills</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="List your technical & soft skills" />
              </Form.Group>

              {/* Additional */}
              <h4 style={{ color: "cyan" }}>Additional Information</h4>
              <Form.Group className="mb-3">
                <Form.Label>LinkedIn Profile</Form.Label>
                <Form.Control type="text" placeholder="LinkedIn URL" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Portfolio / Website</Form.Label>
                <Form.Control type="text" placeholder="Portfolio URL" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Cover Letter</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Write a brief cover letter" />
              </Form.Group>

              {/* Availability */}
              <h4 style={{ color: "cyan" }}>Availability</h4>
              <Form.Group className="mb-3">
                <Form.Label>Earliest Start Date</Form.Label>
                <Form.Control type="date" />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Willing to Relocate?</Form.Label>
                <Form.Select>
                  <option>Yes</option>
                  <option>No</option>
                  <option>Maybe</option>
                </Form.Select>
              </Form.Group>

              <Button
                variant="info"
                style={{ width: "100%", fontWeight: "bold" }}
                onClick={handleSubmit}
              >
                Submit Application
              </Button>
            </Form>
          </Card>
        </Fade>
      </Container>
    </div>
  );
}
