import { Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from "./main/front end/HomePage";
import AuthPage from "./main/front end/AuthPage";
import Login from "./main/front end/Login";
import Signup from "./main/front end/Signup";
import Applicant from "./main/front end/Applicant";
import Recruiter from "./main/front end/Recruiter";
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
