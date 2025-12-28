import React, { useState, useEffect } from 'react';

const TypingText = ({ 
  text, 
  mode = 'letter', 
  delay = 50, 
  stagger = 0.1, 
  className = '', 
  onComplete,
  showCursor = false,
  animationClass = 'animate-reveal'
}) => {
  const [items, setItems] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const splitText = mode === 'word' ? text.split(' ') : text.split('');
    setItems(splitText);
    
    const timer = setTimeout(() => {
      setIsVisible(true);
      if (onComplete) {
        const totalDuration = (splitText.length * stagger * 1000) + 200; // reduced buffer
        setTimeout(onComplete, totalDuration);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, mode, delay, stagger, onComplete]);

  return (
    <span className={`inline flex-wrap whitespace-pre-wrap ${className}`}>
      {items.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className={`inline-block opacity-0 ${isVisible ? animationClass : ''}`}
          style={{
            animationDelay: `${index * stagger}s`,
            marginRight: mode === 'word' ? '0.25em' : '0'
          }}
        >
          {item === ' ' ? '\u00A0' : (item || '\u00A0')}
        </span>
      ))}
    </span>
  );
};

export default TypingText;

