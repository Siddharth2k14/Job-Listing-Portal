
import React from 'react';
import './Login.css'; // reuse the same gradient + animation

export default function AuthPage() {
  return (
    <div className="login-page">
      <div className="login-box animate-drop" style={{ background: '#e6e6e6' }}>
        <h2 style={{ color: '#000' }}>Logged in successfully</h2>
        <p style={{ color: '#000' }}>Welcome! You are now authenticated.</p>
      </div>
    </div>
  );
}
