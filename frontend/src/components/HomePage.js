import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="anim">
      <h1 className='home-h1'>WELCOME TO JOB LISTING PORTAL</h1>
      <div className="home-btn">
        <button type="button" className="btn btn-dark fs-3" onClick={() => navigate("/Login")}>
          LOG IN
        </button>
        <h1 className='home-h1'>OR</h1>
        <button type="button" className="btn btn-dark fs-3" onClick={() => navigate("/Signup")}>
          SIGN UP
        </button>
      </div>
    </div>
  );
}
