import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

// const BACKEND_URL = "http://localhost:5000";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";


export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // OTP state
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');

  // error messages
  const [loginError, setLoginError] = useState('');
  const [otpError, setOtpError] = useState('');

  const handleLogin = async () => {
    setLoginError('');
    setOtpError('');
    if (!email || !password) {
      setLoginError('Please enter email and password.');
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setLoginError(data?.message || 'Login failed');
        return;
      }

      // success -> show OTP input
      setShowOtp(true);

      if (data.otp) console.log('DEV OTP:', data.otp);

    } catch (err) {
      console.error(err);
      setLoginError('Server error. Try again.');
    }
  };

  const handleVerifyOtp = async () => {
    setOtpError('');
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data?.message === 'invalid otp') {
          setOtpError('invalid otp');
        } else {
          setOtpError(data?.message || 'OTP verification failed');
        }
        return;
      }

      // success: save token and navigate
      if (data.token) localStorage.setItem('token', data.token);
      navigate('/AuthPage', { replace: true });

    } catch (err) {
      console.error(err);
      setOtpError('Server error');
    }
  };

  return (
    <div className="login-page">
      <div className="login-box animate-drop">
        <h2>Login</h2>

        {loginError && <p style={{ color: 'red', fontWeight: '700' }}>{loginError}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {!showOtp ? (
          <button type="button" className="login-btn" onClick={handleLogin}>
            LOG IN
          </button>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP sent to your email"
              value={otp}
              onChange={e => setOtp(e.target.value)}
            />
            {otpError && <p style={{ color: 'red' }}>{otpError}</p>}

            <button type="button" className="login-btn" onClick={handleVerifyOtp}>
              VERIFY OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
}
