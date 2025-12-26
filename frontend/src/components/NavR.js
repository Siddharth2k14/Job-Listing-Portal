import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
  Image
} from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";

const STORAGE_KEY = "recruiterProfile";

export default function NavR() {
  const [searchQuery, setSearchQuery] = useState("");
  const [profile, setProfile] = useState({
    name: "Recruiter",
    designation: "Employer",
    photo: ""
  });

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Always sync from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);

      setProfile({
        name: data.name || "Recruiter",
        designation: data.designation || data.role || "Employer",

        // 🔥 SUPPORT BOTH image & photo (bug fix)
        photo:
          data.photo ||
          data.image ||
          ""
      });
    }
  }, [location.pathname]); // 🔁 re-run when route changes

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      `/RecruiterDashboard/Search?query=${encodeURIComponent(searchQuery)}`
    );
  };

  return (
    <Navbar
      expand="lg"
      variant="dark"
      style={{ backgroundColor: "#004d66" }}
      sticky="top"
    >
      <Container>

        {/* 🔹 Profile Preview */}
        <div className="d-flex align-items-center me-4">
          <Image
            src={
              profile.photo ||
              ""
            }
            roundedCircle
            width={42}
            height={42}
            className="me-2"
          />
          <div className="text-white small">
            <div style={{ fontWeight: 600 }}>{profile.name}</div>
            <div style={{ fontSize: "12px", opacity: 0.8 }}>
              {profile.designation}
            </div>
          </div>
        </div>

        <Navbar.Brand as={Link} to="/RecruiterDashboard">
          Employer Dashboard
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/RecruiterDashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/RecruiterDashboard/JobListingsR">Job Listings</Nav.Link>
            <Nav.Link as={Link} to="/RecruiterDashboard/ApplicationsR">Applications</Nav.Link>
            <Nav.Link as={Link} to="/RecruiterDashboard/ProfileR">Profile</Nav.Link>
            <Nav.Link as={Link} to="/RecruiterDashboard/SettingsR">Settings</Nav.Link>
          </Nav>

          <Form className="d-flex" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Search jobs..."
              className="me-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="info" type="submit">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
