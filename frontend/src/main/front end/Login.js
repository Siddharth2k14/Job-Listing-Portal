import React from 'react'
import "./Login.css";
export default function Login() {
  return (
    <div className='login-box'>
      <h2>Login</h2>
      <input type='Email' placeholder='Email'/>
      <input type='password' placeholder='password'/>
      <button type="button" class="btn btn-dark fs-3, text-center">LOG IN</button>
    </div>
  )
}
