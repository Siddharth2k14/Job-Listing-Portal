import React from "react";
import { Container, Row, Col, Card, Button, ProgressBar, Table } from "react-bootstrap";
import { motion } from "framer-motion";

export default function RecruiterDashboard() {
  return (
    <Container fluid style={{ width : "100vh" }}>
      

      {/* 🔹 KPI CARDS */}
      <Row className="mb-4">
        {[
          { title: "Active Jobs", value: 12 },
          { title: "Applicants", value: 245 },
          { title: "Shortlisted", value: 64 },
          { title: "Interviews", value: 18 },
          { title: "Offers Made", value: 5 }
        ].map((item, idx) => (
          <Col md key={idx}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card
                className="shadow"
                style={{ background: "#004f66", color: "white" }}
              >
                <Card.Body>
                  <h6 style={{ color: "#9bd3dd" }}>{item.title}</h6>
                  <h3>{item.value}</h3>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* 🔹 HIRING PIPELINE */}
      <Row className="mb-4">
        <Col md={12}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Card style={{ background: "#003847", color: "white" }}>
              <Card.Body>
                <h5 className="mb-3" style={{ color: "cyan" }}>
                  Hiring Pipeline
                </h5>

                {[
                  { label: "Applied", value: 245 },
                  { label: "Shortlisted", value: 64 },
                  { label: "Interview", value: 18 },
                  { label: "Offer", value: 5 },
                  { label: "Hired", value: 2 }
                ].map((step, idx) => (
                  <div key={idx} className="mb-2">
                    <small>{step.label}</small>
                    <ProgressBar
                      now={(step.value / 245) * 100}
                      variant="info"
                    />
                  </div>
                ))}
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* 🔹 RECENT APPLICANTS */}
      <Row className="mb-4">
        <Col md={8}>
          <Card style={{ background: "#004b66", color: "white" }}>
            <Card.Body>
              <h5 style={{ color: "cyan" }}>Recent Applicants</h5>

              <Table responsive hover variant="dark" className="mt-3">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Experience</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {["Amit", "Sara", "John"].map((name, idx) => (
                    <tr key={idx}>
                      <td>{name}</td>
                      <td>Frontend Developer</td>
                      <td>3+ yrs</td>
                      <td>
                        <Button size="sm" variant="info">
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* 🔹 QUICK ACTIONS */}
        <Col md={4}>
          <Card style={{ background: "#003847", color: "white" }}>
            <Card.Body>
              <h5 style={{ color: "cyan" }}>Quick Actions</h5>

              {[
                "Post New Job",
                "Search Candidates",
                "View Applications",
                "Company Settings"
              ].map((action, idx) => (
                <Button
                  key={idx}
                  variant="outline-info"
                  className="w-100 mb-2"
                >
                  {action}
                </Button>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* 🔹 INSIGHTS */}
      <Row>
        <Col md={12}>
          <Card style={{ background: "#004f66", color: "white" }}>
            <Card.Body>
              <h5 style={{ color: "cyan" }}>Recruiter Insights</h5>
              <Row className="mt-3">
                <Col>Avg. Time to Hire: <strong>18 days</strong></Col>
                <Col>Response Rate: <strong>72%</strong></Col>
                <Col>Hiring Success: <strong>82%</strong></Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

    </Container>
  );
}
