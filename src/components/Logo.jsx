import React from 'react';
import AnimatedText from './AnimatedText';

const Logo = () => {
  return (
    <div className="logo">
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="44" fill="none" stroke="#2d4778" strokeWidth="8"/>
        <text x="60" y="78" textAnchor="middle" fill="#2d4778" fontSize="48">$</text>
      </svg>
      <span className="logo-text">
        <AnimatedText 
          text="finago.ai" 
          delay={150} 
          className="animated-logo-text"
        />
      </span>
    </div>
  );
};

export default Logo; 
