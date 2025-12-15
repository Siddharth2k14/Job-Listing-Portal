import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

export default function JobListings() {
  const navigate = useNavigate();
  const jobs = [
    {
      title: "Frontend Developer (React)",
      description: "Build responsive UI components for modern web apps.",
      qualifications: "HTML, CSS, JS, React, Bootstrap",
      responsibilities: "Develop UI, fix bugs, collaborate with backend team",
      location: "Mumbai, India",
      salary: "₹4,00,000 - ₹6,00,000/year",
    },
    {
      title: "Frontend Developer (Vue)",
      description: "Implement modern, dynamic interfaces using Vue.js.",
      qualifications: "Vue.js, Tailwind, JavaScript, UI fundamentals",
      responsibilities: "Develop reusable components and maintain UI consistency",
      location: "Pune, India",
      salary: "₹3,50,000 - ₹5,50,000/year",
    },
    {
      title: "Backend Developer (Node.js)",
      description: "Work with APIs, databases, and server-side logic.",
      qualifications: "Node.js, Express, MongoDB/MySQL",
      responsibilities: "Build APIs, manage DB, optimize performance",
      location: "Bangalore, India",
      salary: "₹5,00,000 - ₹8,00,000/year",
    },
    {
      title: "Backend Developer (Java/Spring)",
      description: "Build secure backend systems and business logic layers.",
      qualifications: "Java, Spring Boot, SQL, APIs",
      responsibilities: "Develop backend modules, integrate with frontend",
      location: "Hyderabad, India",
      salary: "₹6,00,000 - ₹9,00,000/year",
    },
    {
      title: "UI/UX Designer (Web)",
      description: "Craft clean, modern, user-centered website experiences.",
      qualifications: "Figma, Adobe XD, Wireframing, Prototyping",
      responsibilities: "Design layouts, create prototypes, conduct user tests",
      location: "Delhi, India",
      salary: "₹3,00,000 - ₹5,00,000/year",
    },
    {
      title: "UI/UX Designer (Mobile Apps)",
      description: "Design smooth and intuitive app experiences for Android & iOS.",
      qualifications: "Figma, UX Research, Mobile Design Patterns",
      responsibilities: "Create mockups, build flows, improve usability",
      location: "Chennai, India",
      salary: "₹3,50,000 - ₹5,50,000/year",
    }
    
  ];
  
  

  return (
    <div
      className="min-vh-100 p-3"
      style={{ background: "#003847", color: "white" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container"
      >
        <h2 className="text-center mb-4">Available Job Listings</h2>

        <div className="row g-4">
          {jobs.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="col-12 col-md-6"
            >
              <div
                className="p-4 rounded-4 shadow-lg h-100"
                style={{ background: "#005f73" }}
              >
                <h4 className="mb-2 text-info">{job.title}</h4>
                <p className="mb-2"><strong>Description:</strong> {job.description}</p>
                <p className="mb-2"><strong>Qualifications:</strong> {job.qualifications}</p>
                <p className="mb-2"><strong>Responsibilities:</strong> {job.responsibilities}</p>
                <p className="mb-2"><strong>Location:</strong> {job.location}</p>
                <p className="mb-2"><strong>Salary Range:</strong> {job.salary}</p>

                <button className="btn btn-info w-100 fw-bold mt-3 rounded-3" onClick={() => navigate("/JobApplyA")}>
                  Apply Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
