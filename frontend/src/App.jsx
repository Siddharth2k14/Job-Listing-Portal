import { Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from "./components/HomePage.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Applicant from "./components/Applicant.jsx";
import Recruiter from "./components/Recruiter.jsx";
import AuthPage from "./components/AuthPage.jsx";
import SuccessPage from "./components/SuccessPage.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/HomePage" element={<HomePage/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/Applicant" element={<Applicant/>}/>
        <Route path="/Recruiter" element={<Recruiter/>}/>
        <Route path="/AuthPage" element={<AuthPage/>}/>
        <Route path="/SuccessPage" element={<SuccessPage />} />
        </Routes>
    </div>
  );
};

export default App;
