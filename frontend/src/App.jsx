import { Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from "./components/HomePage";
import AuthPage from "./components/AuthPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Applicant from "./components/Applicant";
import Recruiter from "./components/Recruiter";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/HomePage" element={<HomePage/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/Applicant" element={<Applicant/>}/>
        <Route path="/Recruiter" element={<Recruiter/>}/>
        <Route path="/AuthPage" element={<AuthPage/>}/>
        </Routes>
    </div>
  );
}

export default App;
