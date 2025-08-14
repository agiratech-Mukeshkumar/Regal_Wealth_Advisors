import React from 'react'
import { useAuth } from '../../auth/AuthContext'
import { useNavigate } from 'react-router-dom';

const AdvisorDashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <div>Welcome to the Advisor Page!</div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default AdvisorDashboard