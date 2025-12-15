import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // If user is not logged in, redirect to login
  if (!token) return <Navigate to="/Login" />;

  // If user tries to access a page for a different role
  if (role && userRole !== role) {
    if (userRole === "recruiter") return <Navigate to="/RecruiterDashboard" />;
    if (userRole === "applicant") return <Navigate to="/ApplicantProfile" />;
    return <Navigate to="/Login" />; // fallback
  }

  // If role matches, render the page
  return children;
}
