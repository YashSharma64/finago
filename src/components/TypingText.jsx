import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const TypingText = ({ text, delay = 50, className = '', onComplete, showCursor = true }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
      if (onComplete) {
        onComplete();
      }
    }
  }, [currentIndex, text, delay, onComplete]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && isTyping && <span className="blinking-cursor ml-0.5 text-[#2d4778]">|</span>}
    </span>
  );
};

export default TypingText;
