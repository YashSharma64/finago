import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const TypingText = ({ text, delay = 50, className = '', onComplete }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else if (currentIndex === text.length && onComplete) {
      onComplete();
    }
  }, [currentIndex, text, delay, onComplete]);

  return (
    <span className={className}>
      <ReactMarkdown>{displayText}</ReactMarkdown>
    </span>
  );
};

export default TypingText; 
