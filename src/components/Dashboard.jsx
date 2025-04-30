import React, { useState, useEffect, useRef } from 'react';
import '../styles/Dashboard.css';
import Chat from './Chat';
import TypingText from './TypingText';

const Dashboard = ({ userData, onLogout }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [showWelcome, setShowWelcome] = useState(false);
  const [showLine2, setShowLine2] = useState(false);
  const [showLine3, setShowLine3] = useState(false);
  const [showLine4, setShowLine4] = useState(false);
  const [showLine5, setShowLine5] = useState(false);
  const profileMenuRef = useRef(null);

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (activeTab === 'home') {
      setShowWelcome(true);
    } else {
      setShowWelcome(false);
      setShowLine2(false);
      setShowLine3(false);
      setShowLine4(false);
      setShowLine5(false);
    }
  }, [activeTab]);

  const handleLogout = () => {
    setShowProfileMenu(false);
    onLogout();
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="dashboard">
    
      <nav className="dashboard-nav">
        <div className="nav-logo">
          <img src="/image-removebg-preview.png" alt="Finago" />
        </div>
        <div className="nav-profile">
          <div className="profile-container" ref={profileMenuRef}>
            <button className="profile-button" onClick={toggleProfileMenu}>
              <img src="/profile.png" alt="Profile" />
            </button>
            {showProfileMenu && (
              <div className="profile-dropdown">
                <div className="profile-header">
                  <img src="/profile.png" alt="Profile" className="dropdown-avatar" />
                  <div className="profile-info">
                    <h3>{userData?.name || 'User'}</h3>
                    <p>{userData?.email || 'email@example.com'}</p>
                  </div>
                </div>
                <div className="profile-menu-items">
                  <button className="menu-item">
                    <span className="item-icon">👤</span>
                    My Account
                  </button>
                  <button className="menu-item logout" onClick={handleLogout}>
                    <span className="item-icon">🚪</span>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
          <button className="menu-button">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      
      <div className="dashboard-content">
        <div className="sidebar">
          <h2>FINAGO is all about</h2>
          <ul className="feature-list">
            <li>Spending Habits Analysis</li>
            <li>Smart Budgeting</li>
            <li>Loans & Credit Analysis</li>
            <li>Investment Growth (Earn 10x)</li>
            <li className="highlight">$ Finago Rewards</li>
          </ul>

          <div className="promo-cards">
            <div className="promo-card">
              <div className="promo-content">
                <span className="promo-icon">💰</span>
                <p>Get up to ₹500 Cashback! Track Spending, Boost Savings!</p>
              </div>
            </div>
            <div className="promo-card">
              <div className="promo-content">
                <span className="promo-icon">🎁</span>
                <p>Join Today - Get Exclusive Discounts & Cashback for Free!</p>
              </div>
            </div>
          </div>
        </div>

        <div className="main-area">
          <div className="nav-menu">
            <button 
              className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => handleTabChange('home')}
            >
              <span className="nav-icon">🏠</span>
              <span>Home</span>
            </button>
            <button 
              className={`nav-item ${activeTab === 'ai-advisor' ? 'active' : ''}`}
              onClick={() => handleTabChange('ai-advisor')}
            >
              <span className="nav-icon">🤖</span>
              <span>AI Financial Advisor</span>
            </button>
            <button className="nav-item disabled">
              <span className="nav-icon">📈</span>
              <span>Smart Stock Insights</span>
              <small>(Coming Soon...)</small>
            </button>
            <button className="nav-item disabled">
              <span className="nav-icon">💳</span>
              <span>Finago Pay</span>
              <small>(Coming Soon...)</small>
            </button>
          </div>

          {activeTab === 'home' ? (
            <div className="welcome-box">
              {showWelcome && (
                <h2>
                  <TypingText 
                    text={`Hello ${userData?.name || 'User'},`} 
                    delay={30} 
                    onComplete={() => setShowLine2(true)}
                  />
                </h2>
              )}
              {showLine2 && (
                <p>
                  <TypingText 
                    text="Welcome to Finago - India's First AI Financial Advisor! 🚀" 
                    delay={20} 
                    onComplete={() => setShowLine3(true)}
                  />
                </p>
              )}
              {showLine3 && (
                <p>
                  <TypingText 
                    text="Say goodbye to worries—Your Money is in Safe hands." 
                    delay={20} 
                    onComplete={() => setShowLine4(true)}
                  />
                </p>
              )}
              {showLine4 && (
                <p>
                  <TypingText 
                    text="Let AI grow, manage, and secure your wealth effortlessly! 🤖💰" 
                    delay={20} 
                    onComplete={() => setShowLine5(true)}
                  />
                </p>
              )}
              {showLine5 && (
                <p>
                  <TypingText 
                    text="Now India will be able to Finance - Boost Your Savings with AI" 
                    delay={20} 
                  />
                </p>
              )}
            </div>
          ) : activeTab === 'ai-advisor' ? (
            <Chat userData={userData} />
          ) : null}

          {activeTab === 'home' && (
            <div className="chat-input-container">
              <div className="chat-input-wrapper">
                <input 
                  type="text" 
                  placeholder="Track My Spendings, Invest Now"
                  className="chat-input"
                  onClick={() => handleTabChange('ai-advisor')}
                />
                <button 
                  className="search-button"
                  onClick={() => handleTabChange('ai-advisor')}
                >
                  <span className="search-icon">🔍</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
