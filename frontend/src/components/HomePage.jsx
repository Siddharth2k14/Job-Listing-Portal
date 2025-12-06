import { useNavigate } from 'react-router-dom';
import React from 'react'
import './Home.css';
export default function HomePage() {
  const navigate = useNavigate();
  return (
    <>
    <div className='anim'>
    <h1>WELCOME TO JOB LISTING PORTAL</h1>
    <div className='btn'>
    <button type="button" class="btn btn-dark fs-3" onClick={()=>navigate("/Login")}>LOG IN</button>
    <h1>OR</h1>
    <button type="button" class="btn btn-dark fs-3" onClick={()=>navigate("/Signup")}>SIGN UP</button>
    </div>
    </div>
    </>
  )
}
