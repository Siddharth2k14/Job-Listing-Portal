import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function JobListingsAdmin() {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    qualifications: "",
    responsibilities: "",
    location: "",
    salary: ""
  });

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("job_listings");
    if (saved) setJobs(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("job_listings", JSON.stringify(jobs));
  }, [jobs]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingJob !== null) {
      const updated = [...jobs];
      updated[editingJob] = formData;
      setJobs(updated);
      setEditingJob(null);
    } else {
      setJobs([...jobs, formData]);
    }
    setFormData({
      title: "",
      description: "",
      qualifications: "",
      responsibilities: "",
      location: "",
      salary: ""
    });
  };

  const handleEdit = (index) => {
    setEditingJob(index);
    setFormData(jobs[index]);
  };

  const handleDelete = (index) => {
    const updated = jobs.filter((_, i) => i !== index);
    setJobs(updated);
  };

  return (
    <div
      className="min-vh-100 py-4"
      style={{
        background: "linear-gradient(135deg, #001f2b, #003847)",
        color: "white"
      }}
    >
      <div className="container">
        <h2 className="text-center mb-4" style={{ color: "cyan" }}>
          Manage Job Listings
        </h2>

        {/* Form */}
        <div
          className="card p-4 mb-4 shadow-lg"
          style={{ backgroundColor: "#003847" }}
        >
          <h4 className="mb-3" style={{ color: "cyan" }}>
            {editingJob !== null ? "Edit Job" : "Create Job"}
          </h4>

          <form onSubmit={handleSubmit}>

            {/* Job Details */}
            <h6 className="mt-3 mb-2" style={{ color: "#00e5ff" }}>Job Details</h6>
            <input
              className="form-control mb-2 border-info"
              placeholder="Job Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <input
              className="form-control mb-2 border-info"
              placeholder="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
            <input
              className="form-control mb-3 border-info"
              placeholder="Salary Range"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
            />

            {/* Job Description */}
            <h6 className="mt-3 mb-2" style={{ color: "#00e5ff" }}>Job Description</h6>
            <textarea
              className="form-control mb-3 border-info"
              placeholder="Describe the role, team, and expectations"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />

            {/* Requirements */}
            <h6 className="mt-3 mb-2" style={{ color: "#00e5ff" }}>Requirements</h6>
            <textarea
              className="form-control mb-2 border-info"
              placeholder="Qualifications"
              name="qualifications"
              value={formData.qualifications}
              onChange={handleChange}
            />
            <textarea
              className="form-control mb-3 border-info"
              placeholder="Responsibilities"
              name="responsibilities"
              value={formData.responsibilities}
              onChange={handleChange}
            />

            <button className="btn btn-info w-100" type="submit">
              {editingJob !== null ? "Save Changes" : "Add Job"}
            </button>
          </form>

        </div>

        {/* Job List */}
        <div className="row">
          {jobs.map((job, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <div
                className="card p-3 shadow"
                style={{ backgroundColor: "#004b66", color: "white" }}
              >
                <h5 style={{ color: "cyan" }}>{job.title}</h5>
                <p><strong>Description:</strong> {job.description}</p>
                <p><strong>Qualifications:</strong> {job.qualifications}</p>
                <p><strong>Responsibilities:</strong> {job.responsibilities}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Salary:</strong> {job.salary}</p>

                <div className="d-flex gap-2 mt-2">
                  <button
                    className="btn btn-warning w-50"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger w-50"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {jobs.length === 0 && (
            <p className="text-center text-light opacity-75">
              No job listings added yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
