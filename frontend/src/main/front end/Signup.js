import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Home.css';
export default function Signup() {
    const navigate = useNavigate();
  return (
    <div className='anim'>
      <h1>You Want To Sign Up As?</h1>
      <div className='btn'>
      <button type="button" class="btn btn-dark fs-3" onClick={()=>navigate("/Recruiter")}>RECRUITER</button>
      <h1>OR</h1>
      <button type="button" class="btn btn-dark fs-3" onClick={()=>navigate("/Applicant")}>APPLICANT</button>
      </div>
    </div>
  )
}
