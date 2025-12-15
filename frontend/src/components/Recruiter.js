import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const BACKEND_URL = "http://localhost:5000/api/auth"; // adjust if your backend URL is different

export default function Recruiter() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    if (!name || !email || !password || !companyName) {
      setError('Please fill all fields');
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, companyName, role: 'recruiter' }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Signup failed');
        return;
      }

      // Success: redirect to SuccessPage
      navigate('/SuccessPage');
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className='signUp-page'>
      <div className='signUp-box'>
      <h2 className='signUp-h2'>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type='text' placeholder='Name' value={name} onChange={e => setName(e.target.value)} />
      <input type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
      <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
      <input type='text' placeholder='Company Name' value={companyName} onChange={e => setCompanyName(e.target.value)} />
      <button type="button" className="btn btn-dark fs-3 text-center" onClick={handleSignup}>SIGN UP</button>
    </div>
  </div>
  );
}
