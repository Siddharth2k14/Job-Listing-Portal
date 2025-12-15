import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Button, Modal, Form } from "react-bootstrap";

export default function JobApplicationDashboard() {
  // ---------- Jobs & Applications (with localStorage persistence) ----------
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem("jobs");
    return savedJobs ? JSON.parse(savedJobs) : [];
  });

  const [applications, setApplications] = useState(() => {
    const savedApps = localStorage.getItem("applications");
    return savedApps ? JSON.parse(savedApps) : [];
  });

  useEffect(() => localStorage.setItem("jobs", JSON.stringify(jobs)), [jobs]);
  useEffect(() => localStorage.setItem("applications", JSON.stringify(applications)), [applications]);

  // ---------- Modal State ----------
  const [showJobModal, setShowJobModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showCandidateModal, setShowCandidateModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  // ---------- Job Form ----------
  const [jobForm, setJobForm] = useState({ title: "", salary: "", description: "" });

  const handleJobFormChange = (e) => {
    setJobForm({ ...jobForm, [e.target.name]: e.target.value });
  };

  const handleAddJob = () => setShowJobModal(true);

  const handleSubmitJob = () => {
    if (!jobForm.title) return alert("Job Title is required");
    const newJob = { id: Date.now(), ...jobForm };
    setJobs([...jobs, newJob]);
    setJobForm({ title: "", salary: "", description: "" });
    setShowJobModal(false);
  };

  // ---------- Candidate Form ----------
  const [candidateForm, setCandidateForm] = useState({ name: "", email: "", job: "", status: "Pending" });

  const handleCandidateFormChange = (e) => {
    setCandidateForm({ ...candidateForm, [e.target.name]: e.target.value });
  };

  const handleAddCandidate = () => setShowCandidateModal(true);

  const handleSubmitCandidate = () => {
    if (!candidateForm.name || !candidateForm.email || !candidateForm.job) return alert("All fields required");
    const newCandidate = { id: Date.now(), ...candidateForm };
    setApplications([...applications, newCandidate]);
    setCandidateForm({ name: "", email: "", job: "", status: "Pending" });
    setShowCandidateModal(false);
  };

  // ---------- View Application ----------
  const handleViewApplication = (app) => {
    setSelectedApplication(app);
    setShowApplicationModal(true);
  };
  const handleCloseApplicationModal = () => {
    setSelectedApplication(null);
    setShowApplicationModal(false);
  };

  // ---------- Buttons ----------
  const handleDeleteJob = (id) => {
    if (window.confirm("Delete this job?")) {
      setJobs(jobs.filter((job) => job.id !== id));
      setApplications(applications.filter((app) => app.job !== jobs.find(j => j.id === id)?.title));
    }
  };

  const handleDeleteApplication = (id) => {
    setApplications(applications.filter((app) => app.id !== id));
  };

  const handleToggleStatus = (id) => {
    setApplications(applications.map(app =>
      app.id === id ? { ...app, status: app.status === "Pending" ? "Reviewed" : "Pending" } : app
    ));
  };

  // ---------- Views ----------
  const [activeView, setActiveView] = useState("dashboard"); // "dashboard", "applications", "candidates"

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #001f3f, #004f6e)", padding: "2rem", color: "white" }}>
      <Container>
        <h2 className="text-center mb-4" style={{ color: "cyan" }}>Job Applications Dashboard</h2>

        {/* ---------- Action Cards ---------- */}
        <Row className="mb-4">
          <Col md={4}>
            <Card style={{ backgroundColor: "#005f7f" }}>
              <Card.Body>
                <Card.Title>Manage Job Listings</Card.Title>
                <Card.Text>Add, edit, or delete job postings.</Card.Text>
                <Button variant="info" onClick={handleAddJob}>Add Job</Button>{" "}
                <Button variant="secondary" onClick={() => setActiveView("dashboard")}>View Jobs</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card style={{ backgroundColor: "#006f99" }}>
              <Card.Body>
                <Card.Title>View Applications</Card.Title>
                <Card.Text>See all incoming candidate applications.</Card.Text>
                <Button variant="info" onClick={() => setActiveView("applications")}>View Applications</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card style={{ backgroundColor: "#0080b3" }}>
              <Card.Body>
                <Card.Title>Manage Candidates</Card.Title>
                <Card.Text>Add new candidates or update status.</Card.Text>
                <Button variant="info" onClick={handleAddCandidate}>Add Candidate</Button>{" "}
                <Button variant="secondary" onClick={() => setActiveView("candidates")}>View Candidates</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* ---------- Conditional Views ---------- */}
        {activeView === "dashboard" && (
          <Row>
            <Col>
              <h4 style={{ color: "cyan" }}>Job Listings</h4>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>ID</th><th>Title</th><th>Salary</th><th>Description</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map(job => (
                    <tr key={job.id}>
                      <td>{job.id}</td>
                      <td>{job.title}</td>
                      <td>{job.salary}</td>
                      <td>{job.description}</td>
                      <td>
                        <Button size="sm" variant="danger" onClick={() => handleDeleteJob(job.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        )}

        {activeView === "applications" && (
          <Row>
            <Col>
              <h4 style={{ color: "cyan" }}>Applications</h4>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr><th>ID</th><th>Name</th><th>Email</th><th>Job</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {applications.map(app => (
                    <tr key={app.id}>
                      <td>{app.id}</td>
                      <td>{app.name}</td>
                      <td>{app.email}</td>
                      <td>{app.job}</td>
                      <td>{app.status}</td>
                      <td>
                        <Button size="sm" variant="info" onClick={() => handleViewApplication(app)}>View</Button>{" "}
                        <Button size="sm" variant="secondary" onClick={() => handleToggleStatus(app.id)}>Toggle Status</Button>{" "}
                        <Button size="sm" variant="danger" onClick={() => handleDeleteApplication(app.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        )}

        {activeView === "candidates" && (
          <Row>
            <Col>
              <h4 style={{ color: "cyan" }}>Candidates</h4>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr><th>ID</th><th>Name</th><th>Email</th><th>Job Applied</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {applications.map(app => (
                    <tr key={app.id}>
                      <td>{app.id}</td>
                      <td>{app.name}</td>
                      <td>{app.email}</td>
                      <td>{app.job}</td>
                      <td>{app.status}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        )}

      </Container>

      {/* ---------- Job Modal ---------- */}
      <Modal show={showJobModal} onHide={() => setShowJobModal(false)}>
        <Modal.Header closeButton><Modal.Title>Add Job</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Job Title</Form.Label>
              <Form.Control type="text" name="title" value={jobForm.title} onChange={handleJobFormChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Salary</Form.Label>
              <Form.Control type="text" name="salary" value={jobForm.salary} onChange={handleJobFormChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name="description" value={jobForm.description} onChange={handleJobFormChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowJobModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmitJob}>Add Job</Button>
        </Modal.Footer>
      </Modal>

      {/* ---------- Candidate Modal ---------- */}
      <Modal show={showCandidateModal} onHide={() => setShowCandidateModal(false)}>
        <Modal.Header closeButton><Modal.Title>Add Candidate</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={candidateForm.name} onChange={handleCandidateFormChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={candidateForm.email} onChange={handleCandidateFormChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Job Applied</Form.Label>
              <Form.Select name="job" value={candidateForm.job} onChange={handleCandidateFormChange}>
                <option value="">Select Job</option>
                {jobs.map(job => <option key={job.id} value={job.title}>{job.title}</option>)}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCandidateModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmitCandidate}>Add Candidate</Button>
        </Modal.Footer>
      </Modal>

      {/* ---------- Application View Modal ---------- */}
      <Modal show={showApplicationModal} onHide={handleCloseApplicationModal}>
        <Modal.Header closeButton><Modal.Title>Application Details</Modal.Title></Modal.Header>
        <Modal.Body>
          {selectedApplication && (
            <>
              <p><strong>Name:</strong> {selectedApplication.name}</p>
              <p><strong>Email:</strong> {selectedApplication.email}</p>
              <p><strong>Job Applied:</strong> {selectedApplication.job}</p>
              <p><strong>Status:</strong> {selectedApplication.status}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseApplicationModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
