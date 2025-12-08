import React from 'react'
import "./Login.css";
export default function Login() {
  return (
    <div className="login-page">
      <div className="login-box animate-drop">
        <h2>Login</h2>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="button" className="login-btn">LOG IN</button>
      </div>
    </div>
  )
}
