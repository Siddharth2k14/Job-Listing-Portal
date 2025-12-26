import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function JobListingsAdmin() {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    qualifications: "",
    responsibilities: "",
    location: "",
    salary: "",
  });
  const [notifications, setNotifications] = useState([]);

  // Load jobs and notifications from localStorage
  useEffect(() => {
    const savedJobs = localStorage.getItem("job_listings");
    if (savedJobs) setJobs(JSON.parse(savedJobs));

    const savedNotifs = localStorage.getItem("job_notifications");
    if (savedNotifs) setNotifications(JSON.parse(savedNotifs));
  }, []);

  // Save jobs and notifications to localStorage
  useEffect(() => {
    localStorage.setItem("job_listings", JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem("job_notifications", JSON.stringify(notifications));
  }, [notifications]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingJob !== null) {
      const updatedJobs = [...jobs];
      updatedJobs[editingJob] = formData;
      setJobs(updatedJobs);
      setEditingJob(null);
    } else {
      setJobs([...jobs, formData]);
      const newNotif = {
        id: Date.now(),
        type: "new_job",
        message: `New job posted: ${formData.title}`,
        read: false,
        date: new Date().toISOString(),
      };
      setNotifications([newNotif, ...notifications]);
    }
    setFormData({
      title: "",
      description: "",
      qualifications: "",
      responsibilities: "",
      location: "",
      salary: "",
    });
    setShowForm(false);
  };

  const handleEdit = (index) => {
    setEditingJob(index);
    setFormData(jobs[index]);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      const deletedJob = jobs[index];
      setJobs(jobs.filter((_, i) => i !== index));
      const delNotif = {
        id: Date.now(),
        type: "deleted_job",
        message: `Job deleted: ${deletedJob.title}`,
        read: false,
        date: new Date().toISOString(),
      };
      setNotifications([delNotif, ...notifications]);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div
      className="min-vh-100 py-4"
      style={{
        background: "linear-gradient(135deg, #001f3f, #003847)",
        color: "white",
        position: "relative",
        width: "100vh"
      }}
    >
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 style={{ color: "cyan" }}>
            Manage Job Listings{" "}
            {unreadCount > 0 && (
              <Badge bg="info" pill>
                {unreadCount}
              </Badge>
            )}
          </h2>
          {/* Floating Add Button moved to top-right */}
          <Button
            variant="info"
            style={{ borderRadius: "50%", width: "50px", height: "50px", fontSize: "1.8rem" }}
            onClick={() => setShowForm(true)}
          >
            +
          </Button>
        </div>

        {/* Job Form Modal */}
        <Modal show={showForm} onHide={() => setShowForm(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{editingJob !== null ? "Edit Job" : "Add Job"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-2">
                <Form.Label>Job Title</Form.Label>
                <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Salary Range</Form.Label>
                <Form.Control type="text" name="salary" value={formData.salary} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Qualifications</Form.Label>
                <Form.Control as="textarea" name="qualifications" value={formData.qualifications} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Responsibilities</Form.Label>
                <Form.Control as="textarea" name="responsibilities" value={formData.responsibilities} onChange={handleChange} required />
              </Form.Group>
              <Button variant="info" type="submit" className="mt-2 w-100">
                {editingJob !== null ? "Save Changes" : "Add Job"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Job Listings */}
        <div className="row">
          {jobs.map((job, index) => (
            <div className="col-md-6 mb-3" key={index}>
              <div className="card p-3 shadow-lg" style={{ backgroundColor: "#004b66", color: "white" }}>
                <h5 style={{ color: "cyan" }}>{job.title}</h5>
                <p><strong>Description:</strong> {job.description}</p>
                <p><strong>Qualifications:</strong> {job.qualifications}</p>
                <p><strong>Responsibilities:</strong> {job.responsibilities}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Salary:</strong> {job.salary}</p>

                <div className="d-flex gap-2 mt-2">
                  <Button variant="warning" className="w-50" onClick={() => handleEdit(index)}>Edit</Button>
                  <Button variant="danger" className="w-50" onClick={() => handleDelete(index)}>Delete</Button>
                </div>
              </div>
            </div>
          ))}
          {jobs.length === 0 && <p className="text-center text-light opacity-75 mt-3">No job listings added yet.</p>}
        </div>
      </div>
    </div>
  );
}
