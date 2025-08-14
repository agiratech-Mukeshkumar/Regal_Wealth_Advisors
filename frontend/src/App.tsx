import React from 'react';
import './App.css';
import LoginPage from './components/LoginPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext'; 
import AdminDashboard from './components/admin/AdminDashboard';
import AdvisorDashboard from './components/advisor/AdvisorDashboard';
import FactFinderForm from './components/client/FactFinderForm';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          
          <Route path = '/admin/dashboard' element = {<AdminDashboard/>}/>
          <Route path = '/advisor/dashboard' element = {<AdvisorDashboard/>}/>
          <Route path = '/client/fact-finder' element = {<FactFinderForm/>}/>

        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
