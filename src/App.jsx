import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [showLogin, setShowLogin] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleLoginSubmit = (formData) => {
    setUserData(formData);
    setShowLogin(false);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUserData(null);
    setCurrentPage('landing');
  };

  return (
    <div className="app">
      {currentPage === 'landing' ? (
        <LandingPage onGetStarted={handleLoginClick} onLoginClick={handleLoginClick} />
      ) : (
        <Dashboard userData={userData} onLogout={handleLogout} />
      )}
      
      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onContinue={handleLoginSubmit}
        />
      )}
    </div>
  );
}

export default App;
