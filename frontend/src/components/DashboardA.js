import React, { useState } from "react";
import { Form, Card, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

export default function DashboardA() {
  const [search, setSearch] = useState("");

  /* JOB DATA */
  const jobs = [
    { title: "Web Developer", company: "Google", location: "Bangalore, India" },
    { title: "Frontend Developer", company: "Microsoft", location: "Hyderabad, India" },
    { title: "Backend Engineer", company: "Amazon", location: "Pune, India" },
    { title: "UI/UX Designer", company: "Adobe", location: "Remote" },
    { title: "Data Analyst", company: "Netflix", location: "Mumbai, India" }
  ];

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  /* COMPANIES */
  const companies = [
    {
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
    },
    {
      name: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
    },
    {
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
    },
    {
      name: "Netflix",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg"
    }
  ];

  /* COURSES */
  const courses = [
    {
      title: "Web Development",
      desc: "HTML, CSS, JS, React roadmap",
      link: "https://www.youtube.com/watch?v=G3e-cpL7ofc"
    },
    {
      title: "AI / ML",
      desc: "Machine learning fundamentals",
      link: "https://www.youtube.com/watch?v=GwIo3gDZCVQ"
    },
    {
      title: "Data Science",
      desc: "Python, pandas, analytics",
      link: "https://www.youtube.com/watch?v=ua-CiDNNj30"
    },
    {
      title: "UI / UX",
      desc: "Design systems & Figma",
      link: "https://www.youtube.com/watch?v=3Y1Y2s7bJ6g"
    },
    {
      title: "App Development",
      desc: "Android & iOS basics",
      link: "https://www.youtube.com/watch?v=fis26HvvDII"
    },
    {
      title: "Game Development",
      desc: "Unity game development",
      link: "https://www.youtube.com/watch?v=gB1F9G0JXOo"
    }
  ];

  return (
    <div
      style={{
        background: "#003847",
        minHeight: "100vh",
        padding: "30px",
        color: "white"
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        {/* SEARCH */}
        <h2 className="mb-4">Applicant Dashboard</h2>
        <Form.Control
          className="mb-5 bg-dark text-white border-info"
          placeholder="🔍 Search jobs (e.g. web developer)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* JOB OPENINGS */}
        <Section title="Job Openings">
          <Row>
            {filteredJobs.map((job, idx) => (
              <Col md={4} key={idx} className="mb-4">
                <Card className="bg-dark text-white shadow h-100">
                  <Card.Body>
                    <Card.Title>{job.title}</Card.Title>
                    <Card.Text className="mb-1">
                      <strong>{job.company}</strong>
                    </Card.Text>
                    <Card.Text className="text-info">
                      📍 {job.location}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Section>

        {/* COMPANIES HIRING */}
        <Section title="Companies Hiring Now">
          <Row>
            {companies.map((c, i) => (
              <Col md={3} key={i} className="mb-4">
                <Card className="bg-dark text-center text-white shadow h-100">
                  <Card.Body>
                    <img
                      src={c.logo}
                      alt={c.name}
                      style={{
                        width: "80px",
                        height: "40px",
                        objectFit: "contain",
                        marginBottom: "10px",
                        background: "white",
                        padding: "5px",
                        borderRadius: "6px"
                      }}
                    />
                    <h6 className="mt-2">{c.name}</h6>
                    <small className="text-info">Actively Hiring</small>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Section>

        {/* COURSES */}
        <Section title="Recommended Courses">
          <Row>
            {courses.map((course, idx) => (
              <Col md={4} key={idx} className="mb-4">
                <Card className="bg-dark text-white shadow h-100">
                  <Card.Body>
                    <Card.Title>{course.title}</Card.Title>
                    <Card.Text>{course.desc}</Card.Text>
                    <a
                      href={course.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-info"
                    >
                      ▶ Watch on YouTube
                    </a>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Section>

        {/* FOOTER */}
        <footer
          style={{
            marginTop: "60px",
            paddingTop: "20px",
            borderTop: "1px solid #9bd3dd",
            textAlign: "center",
            color: "#9bd3dd"
          }}
        >
          © 2025 Job Portal • Learn • Apply • Grow
        </footer>
      </motion.div>
    </div>
  );
}

/* SECTION */
function Section({ title, children }) {
  return (
    <div className="mb-5">
      <h4
        style={{
          borderBottom: "1px solid #9bd3dd",
          paddingBottom: "8px",
          marginBottom: "20px"
        }}
      >
        {title}
      </h4>
      {children}
    </div>
  );
}
