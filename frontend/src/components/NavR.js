import React, { useState } from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export default function NavR() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to search results page or handle search
    navigate(`/RecruiterDashboard/Search?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <Navbar expand="lg" variant="dark" style={{ backgroundColor: '#004d66' }} sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/RecruiterDashboard">Employer Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/RecruiterDashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/RecruiterDashboard/JobListingsR">Job Listings</Nav.Link>
            <Nav.Link as={Link} to="/RecruiterDashboard/ApplicationsR">Applications</Nav.Link>
            <Nav.Link as={Link} to="/RecruiterDashboard/ProfileR">Profile</Nav.Link>
          </Nav>
          
          {/* Search Form on the right */}
          <Form className="d-flex" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Search jobs..."
              className="me-2"
              aria-label="Search"
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
