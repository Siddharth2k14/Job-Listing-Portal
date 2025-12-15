import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SuccessPage.css';

export default function SuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // redirect after 2 seconds
    const timer = setTimeout(() => {
      navigate('/Login', { replace: true });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="success-page animate-drop">
      <h1>Account Created Successfully!</h1>
    </div>
  );
}
