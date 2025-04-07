import React from 'react';
import Logo from './Logo';
import '../styles/LandingPage.css';

const LandingPage = ({ onGetStarted, onLoginClick }) => {
  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="small-logo">
          <svg width="60" height="60" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#C4A484" strokeWidth="8"/>
            <text x="50" y="65" textAnchor="middle" fill="#C4A484" fontSize="40">$</text>
          </svg>
        </div>
        <div className="nav-text">Your Money is in Safe Hands</div>
        <button className="login-button" onClick={onLoginClick}>login/Register</button>
      </nav>
      
      <main className="main-content">
        <Logo />
        <h1 className="main-heading" style={{fontSize: '30px'}}>India's Most Trusted AI Financial Advisory</h1>
        <button className="get-started-button" onClick={onGetStarted}>Get Started</button>
        <div className="bottom-text">
          <span role="img" aria-label="robot" className="robot-emoji">🤖</span>
          <p>Turn Your Savings into Rewards – AI-Powered Finance!</p>
        </div>
      </main>

      <section className="about-section">
        <div className="about-container">
          <h2 className="about-title">About FINAGO</h2>
          
          <div className="about-content">
            <p>
              Finago is India's first AI-powered financial advisor dedicated to
              transforming the way Indians manage, save, and grow their
              money. At Finago, we believe financial wellness should be fun,
              rewarding, and accessible to everyone—whether you're a student,
              a salaried professional, or a growing entrepreneur.
            </p>
            
            <p>
              We blend artificial intelligence with gamified saving experiences,
              helping users develop smart money habits through exciting
              challenges, real-time spend tracking, and personalized financial
              insights. With Finago, your savings journey becomes engaging—
              and your discipline is rewarded.
            </p>
            
            <p>
              From setting weekly savings goals to participating in nationwide
              savings competitions, Finago encourages healthy financial habits
              while offering the chance to earn real rewards, cashback, and
              recognition.
            </p>
            
            <p className="mission">
              Our mission is simple:<br />
              Turn your savings into rewards. Make every rupee count.<br />
              Because at Finago—your money, is our responsibility.
            </p>

            <div className="founder-card">
              <div className="founder-image">
                <img src="/Yash.png" alt="Yash Sharma" />
              </div>
              <div className="founder-info">
                <h3>Founder :- Yash Sharma</h3>
                <p>AI Software Engineer</p>
                <p className="contact">Contact us - yashsharma.aiml@gmail.com</p>
                <div className="social-links">
                  <a href="https://linkedin.com/in/yashsharma" target="_blank" rel="noopener noreferrer">
                    <img src="/linkedin.png" alt="LinkedIn" className="social-icon" />
                  </a>
                  <a href="https://instagram.com/yashsharma" target="_blank" rel="noopener noreferrer">
                    <img src="/insta.jpeg" alt="Instagram" className="social-icon" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage; 