import React from 'react';
import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const FactFinderForm = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); 
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div>Welcome to the Client Page!</div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default FactFinderForm;
