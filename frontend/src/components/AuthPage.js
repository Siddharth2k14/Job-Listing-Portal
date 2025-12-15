import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 

export default function AuthPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/ApplicantProfile', { replace: true });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="login-page">
       <div className="login-box animate-drop" style={{ background: '#e6e6e6' }}>
        <h2 style={{ color: '#000' }}>Logged in successfully</h2>
         <p style={{ color: '#000' }}>Welcome! You are now authenticated.</p>
       </div>
     </div>
  );
}
