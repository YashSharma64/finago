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
              Finago is India's first AI-powered financial advisor built to simplify money management for every Indian. Our mission is to empower individuals with smart, data-driven financial decisions through intuitive technology, without needing complex knowledge or manual effort. Whether it's tracking expenses, optimizing savings, or planning investments—Finago is your all-in-one financial guide.
            </p>
            
            <p>
              We combine the power of artificial intelligence and automation to help users understand their spending habits, receive personalized financial insights, and stay in control of their financial journey. By securely integrating with users' bank accounts and payment data, Finago delivers timely suggestions, savings tips, and actionable advice—all in a user-friendly interface designed for Indian lifestyles.
            </p>
            
            <p>
              At Finago, we believe managing money shouldn't be stressful. That's why we've created a seamless experience where users can monitor their finances, set personal goals, and unlock smarter ways to save and grow. With a deep understanding of the Indian mindset, Finago is not just another finance app—it's your trusted financial companion for everyday life.
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
                  <a href="https://www.linkedin.com/in/yash-sharma-6960ab326/" target="_blank" rel="noopener noreferrer">
                    <img src="/Linkedin.png" alt="LinkedIn" className="social-icon" />
                  </a>
                  <a href="https://wa.me/919711132445" target="_blank" rel="noopener noreferrer">
                    <img src="/whatsapp.png" alt="Instagram" className="social-icon" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <svg width="40" height="40" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="lightyellow" strokeWidth="8"/>
                <text x="50" y="65" textAnchor="middle" fill="#FFD700" fontSize="40">$</text>
              </svg>
              <h3>finago.ai</h3>
            </div>
            <p className="footer-description">India's First AI Financial Advisor</p>
            <div className="footer-social">
              <a href="https://www.linkedin.com/in/yash-sharma-6960ab326/" target="_blank" rel="noopener noreferrer">
                <img src="/Linkedin.png" alt="LinkedIn" className="social-icon" />
              </a>
              <a href="https://wa.me/919711132445" target="_blank" rel="noopener noreferrer">
                <img src="/whatsapp.png" alt="WhatsApp" className="social-icon" />
              </a>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="footer-section">
              <h4>Services</h4>
              <ul>
                <li>AI Financial Advisor</li>
                <li>Smart Budgeting</li>
                <li>Investment Growth</li>
                <li>Finago Rewards</li>
              </ul>
            </div>
          </div>

          <div className="footer-contact">
            <h4>Contact Us</h4>
            <div className="contact-info">
              <p><span><img src="mail.png" /></span> yashsharma.aiml@gmail.com</p>
              <p><span><img src="contact.png" alt="" /></span> +91 9711132445</p>
              <p><span><img src="location.png" alt="" /></span> YourSpace Hostel, Porwal Road, Lohegaon</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>Copyright © 2025 Finago.ai. All rights reserved.</p>
          <div className="legal-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 
