import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

const BACKEND_URL = "http://localhost:5000";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = async () => {
    setLoginError('');

    if (!email || !password) {
      setLoginError("Please enter email and password.");
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoginError(data?.message || "Login failed");
        return;
      }

      /* =================== ADDED START =================== */
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      if (data.role) {
        localStorage.setItem("role", data.role);

        if (data.role === "applicant") {
          navigate("/ApplicantProfile", { replace: true });
        } else if (data.role === "recruiter") {
          navigate("/RecruiterDashboard", { replace: true });
        } else {
          navigate("/AuthPage", { replace: true });
        }
      }
      /* =================== ADDED END =================== */

    } catch (err) {
      console.error(err);
      setLoginError("Server error. Try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box animate-drop">
        <h2 className='login-h2'>Login</h2>

        {loginError && (
          <p style={{ color: "red", fontWeight: "700" }}>{loginError}</p>
        )}

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

        <button type="button" className="login-btn" onClick={handleLogin}>
          LOG IN
        </button>
      </div>
    </div>
  );
}
