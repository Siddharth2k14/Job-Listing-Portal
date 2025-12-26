import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";

export default function JobApplicationDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setJobs(JSON.parse(localStorage.getItem("job_listings") || "[]"));
    setApplications(JSON.parse(localStorage.getItem("applicant_applications") || "[]"));
    setNotifications(JSON.parse(localStorage.getItem("recruiter_notifications") || "[]"));
  }, []);

  const handleRespond = (app, status) => {
    // Update application with recruiter response
    const allApps = applications.map(a =>
      a.jobTitle === app.jobTitle && a.dateTime === app.dateTime
        ? { ...a, recruiterStatus: status }
        : a
    );
    setApplications(allApps);
    localStorage.setItem("applicant_applications", JSON.stringify(allApps));

    // Notify applicant
    const applicantNotifications = JSON.parse(localStorage.getItem("applicant_notifications") || "[]");
    const newNotif = {
      jobTitle: app.jobTitle,
      status: status,
      read: false,
      dateTime: new Date().toISOString()
    };
    localStorage.setItem("applicant_notifications", JSON.stringify([...applicantNotifications, newNotif]));

    // Mark recruiter notification as read
    const updatedNotifications = notifications.map(n =>
      n.jobTitle === app.jobTitle && n.applicantName === app.applicantName
        ? { ...n, read: true }
        : n
    );
    setNotifications(updatedNotifications);
    localStorage.setItem("recruiter_notifications", JSON.stringify(updatedNotifications));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #001f3f, #004f6e)", padding: "2rem", color: "white" }}>
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Recruiter Dashboard</h2>
          <div>
            <span className="badge bg-info text-dark">
              Notifications: {unreadCount}
            </span>
          </div>
        </div>

        <h4 style={{ color: "cyan" }}>Applications</h4>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr><th>Job</th><th>Applicant</th><th>Date</th><th>Status</th><th>Respond</th></tr>
          </thead>
          <tbody>
            {applications.map((app, idx) => (
              <tr key={idx}>
                <td>{app.jobTitle}</td>
                <td>{app.applicantName || "Applicant"}</td>
                <td>{new Date(app.dateTime).toLocaleString()}</td>
                <td>{app.recruiterStatus || "Pending"}</td>
                <td>
                  <Button size="sm" variant="success" onClick={() => handleRespond(app, "Selected")}>Selected</Button>{" "}
                  <Button size="sm" variant="danger" onClick={() => handleRespond(app, "Rejected")}>Rejected</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
//import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, Button, Table, Modal, Form } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';


// export default function RecruiterDashboard() {
//   const navigate = useNavigate();

//   // ----------------- Jobs State with localStorage -----------------
//   const [jobs, setJobs] = useState(() => {
//     const savedJobs = localStorage.getItem('jobs');
//     return savedJobs
//       ? JSON.parse(savedJobs)
//       : [
//           { id: 1, title: 'Frontend Developer', applicants: 12 },
//           { id: 2, title: 'Backend Developer', applicants: 8 },
//         ];
//   });

//   const [applications, setApplications] = useState([
//     { id: 1, name: 'Alice', job: 'Frontend Developer', status: 'Pending' },
//     { id: 2, name: 'Bob', job: 'Backend Developer', status: 'Reviewed' },
//   ]);

//   const [showJobModal, setShowJobModal] = useState(false);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [isAddMode, setIsAddMode] = useState(false);

//   const [showAppModal, setShowAppModal] = useState(false);
//   const [selectedApp, setSelectedApp] = useState(null);

//   // ----------------- Persist Jobs -----------------
//   useEffect(() => {
//     localStorage.setItem('jobs', JSON.stringify(jobs));
//   }, [jobs]);

//   // ----------------- Navigation -----------------
//   const handleManageJobs = () => navigate('/RecruiterDashboard/JobListings');
//   const handleViewApplications = () => navigate('/RecruiterDashboard/Applications');

//   // ----------------- Job Actions -----------------
//   const handleEditJob = (job) => {
//     setSelectedJob(job);
//     setIsAddMode(false);
//     setShowJobModal(true);
//   };

//   const handleDeleteJob = (jobId) => {
//     if (window.confirm('Are you sure you want to delete this job?')) {
//       setJobs(jobs.filter(job => job.id !== jobId));
//     }
//   };

//   const handleAddJob = () => {
//     setSelectedJob({ id: Date.now(), title: '', applicants: 0 });
//     setIsAddMode(true);
//     setShowJobModal(true);
//   };

//   const handleSaveJob = () => {
//     if (isAddMode) {
//       setJobs([...jobs, selectedJob]);
//     } else {
//       setJobs(jobs.map(job => job.id === selectedJob.id ? selectedJob : job));
//     }
//     setShowJobModal(false);
//   };

//   // ----------------- Application Actions -----------------
//   const handleViewApplication = (app) => {
//     setSelectedApp(app);
//     setShowAppModal(true);
//   };

//   const handleUpdateStatus = (appId) => {
//     setApplications(applications.map(app =>
//       app.id === appId
//         ? { ...app, status: app.status === 'Pending' ? 'Reviewed' : 'Pending' }
//         : app
//     ));
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//       style={{ minHeight: '100vh', backgroundColor: '#003f55', paddingTop: '2rem', color: '#fff' }}
//     >
//       <Container>
//         <h2 className="mb-4">Recruiter Dashboard</h2>

//         {/* ================= MAIN LAYOUT ================= */}
//         <Row>
          
//           {/* RIGHT: DASHBOARD CONTENT */}
//           <Col md={8}>
//             {/* Action Cards */}
//             <Row className="mb-4">
//               <Col md={6}>
//                 <Card style={{ backgroundColor: '#005f7f' }} className="mb-3 shadow">
//                   <Card.Body>
//                     <Card.Title>Manage Job Listings</Card.Title>
//                     <Card.Text>
//                       View, update and add job postings.
//                     </Card.Text>
//                     <Button variant="info" onClick={handleManageJobs}>
//                       Manage Jobs
//                     </Button>{' '}
//                     <Button variant="success" onClick={handleAddJob}>
//                       Add Job
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               </Col>

//               <Col md={6}>
//                 <Card style={{ backgroundColor: '#006f99' }} className="mb-3 shadow">
//                   <Card.Body>
//                     <Card.Title>View Applications</Card.Title>
//                     <Card.Text>
//                       Review candidates and update status.
//                     </Card.Text>
//                     <Button variant="info" onClick={handleViewApplications}>
//                       View Applications
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             </Row>

//             {/* Job Listings */}
//             <h4>Recent Job Listings</h4>
//             <Table striped bordered hover variant="dark" className="mb-4">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Job Title</th>
//                   <th>Applicants</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {jobs.map(job => (
//                   <tr key={job.id}>
//                     <td>{job.id}</td>
//                     <td>{job.title}</td>
//                     <td>{job.applicants}</td>
//                     <td>
//                       <Button size="sm" variant="info" onClick={() => handleEditJob(job)}>
//                         Edit
//                       </Button>{' '}
//                       <Button size="sm" variant="danger" onClick={() => handleDeleteJob(job.id)}>
//                         Delete
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>

//             {/* Applications */}
//             <h4>Recent Applications</h4>
//             <Table striped bordered hover variant="dark">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Job</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {applications.map(app => (
//                   <tr key={app.id}>
//                     <td>{app.id}</td>
//                     <td>{app.name}</td>
//                     <td>{app.job}</td>
//                     <td>{app.status}</td>
//                     <td>
//                       <Button size="sm" variant="info" onClick={() => handleViewApplication(app)}>
//                         View
//                       </Button>{' '}
//                       <Button size="sm" variant="secondary" onClick={() => handleUpdateStatus(app.id)}>
//                         Update
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </Col>
//         </Row>
//       </Container>

//       {/* ================= MODALS ================= */}

//       {/* Job Modal */}
//       <Modal show={showJobModal} onHide={() => setShowJobModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>{isAddMode ? 'Add Job' : 'Edit Job'}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedJob && (
//             <Form>
//               <Form.Group className="mb-3">
//                 <Form.Label>Job Title</Form.Label>
//                 <Form.Control
//                   value={selectedJob.title}
//                   onChange={(e) =>
//                     setSelectedJob({ ...selectedJob, title: e.target.value })
//                   }
//                 />
//               </Form.Group>

//               <Form.Group>
//                 <Form.Label>Applicants</Form.Label>
//                 <Form.Control
//                   type="number"
//                   value={selectedJob.applicants}
//                   onChange={(e) =>
//                     setSelectedJob({
//                       ...selectedJob,
//                       applicants: Number(e.target.value),
//                     })
//                   }
//                 />
//               </Form.Group>
//             </Form>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowJobModal(false)}>
//             Close
//           </Button>
//           <Button variant="success" onClick={handleSaveJob}>
//             {isAddMode ? 'Add Job' : 'Save'}
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Application Modal */}
//       <Modal show={showAppModal} onHide={() => setShowAppModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Application Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedApp && (
//             <>
//               <p><strong>Name:</strong> {selectedApp.name}</p>
//               <p><strong>Job:</strong> {selectedApp.job}</p>
//               <p><strong>Status:</strong> {selectedApp.status}</p>
//             </>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowAppModal(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </motion.div>
//   );
// }
