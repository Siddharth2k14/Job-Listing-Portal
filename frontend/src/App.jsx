import { Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from "./main/frontend/HomePage.js";
import ApplicantProfile from "./main/frontend/ApplicantProfile.js";
import AuthPage from "./main/frontend/AuthPage.js";
import Login from "./main/frontend/Login.js";
import Signup from "./main/frontend/Signup.js";
import Applicant from "./main/frontend/Applicant.js";
import Recruiter from "./main/frontend/Recruiter.js";
import SuccessPage from "./main/frontend/SuccessPage.js";
import ProfileA from "./main/frontend/ProfileA.js";
import JobListingsA from "./main/frontend/JobListingsA.js";
import ApplicationsA from "./main/frontend/ApplicationsA.js";
import DashboardA from "./main/frontend/DashboardA.js";
import SuccessA from "./main/frontend/SuccessA.js";
import JobApplyA from "./main/frontend/JobApplyA.js";
import SettingsA from "./main/frontend/SettingsA.js";
import LayoutA from "./main/frontend/LayoutA.js";
import ProtectedRoute from "./main/frontend/ProtectedRoute.js";
import RecruiterDashboard from "./main/frontend/RecruiterDashboard.js";
import LayoutR from "./main/frontend/LayoutR.js";
import JobListingsR from "./main/frontend/JobListingsR.js";
import ApplicationsR from "./main/frontend/ApplicationsR.js";
import ProfileR from "./main/frontend/ProfileR.js";
function App() {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Applicant" element={<Applicant />} />
        <Route path="/Recruiter" element={<Recruiter />} />
        <Route path="/AuthPage" element={<AuthPage />} />
        <Route path="/SuccessPage" element={<SuccessPage />} />
        <Route path="/SuccessA" element={<SuccessA />} />
        <Route path="/JobApplyA" element={<JobApplyA />} />

        {/* ================= Protected Routes ================= */}

        {/* Applicant Routes */}
        <Route
          path="/ApplicantProfile"
          element={
            <ProtectedRoute role="applicant">
              <ApplicantProfile />
            </ProtectedRoute>
          }
        />

        {/* Recruiter Routes */}
        <Route
          path="/RecruiterDashboard"
          element={
            <ProtectedRoute role="recruiter">
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />

        {/* Nested Dashboard Routes (example: for applicants) */}
        <Route path="/" element={<LayoutA />}>
          <Route
            path="DashboardA"
            element={
              <ProtectedRoute role="applicant">
                <DashboardA />
              </ProtectedRoute>
            }
          />
          <Route
            path="ProfileA"
            element={
              <ProtectedRoute role="applicant">
                <ProfileA />
              </ProtectedRoute>
            }
          />
          <Route
            path="JobListingsA"
            element={
              <ProtectedRoute role="applicant">
                <JobListingsA />
              </ProtectedRoute>
            }
          />
          <Route
            path="ApplicationsA"
            element={
              <ProtectedRoute role="applicant">
                <ApplicationsA />
              </ProtectedRoute>
            }
          />
          <Route
            path="SettingsA"
            element={
              <ProtectedRoute role="applicant">
                <SettingsA />
              </ProtectedRoute>
            }
          />
        </Route>
        {/* Nested Recruiter Routes */}
        <Route path="/RecruiterDashboard" element={<LayoutR />}>
          <Route
            index
            element={
              <ProtectedRoute role="recruiter">
                <RecruiterDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="JobListingsR"
            element={
              <ProtectedRoute role="recruiter">
                <JobListingsR />
              </ProtectedRoute>
            }
          />
          <Route
            path="ApplicationsR"
            element={
              <ProtectedRoute role="recruiter">
                <ApplicationsR />  
              </ProtectedRoute>
            }
          />
          <Route
            path="ProfileR"
            element={
              <ProtectedRoute role="recruiter">
                <ProfileR />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
