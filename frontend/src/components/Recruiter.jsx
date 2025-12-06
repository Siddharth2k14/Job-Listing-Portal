import React from 'react'
import './Login.css';
export default function Recruiter() {
  return (
    <div>
      <div className='signUp-box'>
      <h2>Sign Up</h2>
      <input type='Name' placeholder='Name'/>
      <input type='Email' placeholder='Email'/>
      <input type='password' placeholder='password'/>
      <input type='Company Name' placeholder='Company Name'/>
      <button type="button" class="btn btn-dark fs-3, text-center">SIGN UP</button>
    </div>
    </div>
  )
}
