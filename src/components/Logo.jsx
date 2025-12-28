import React from 'react';
import TypingText from './TypingText';

const Logo = () => {
  return (
    <div className="flex items-center gap-1.5 mb-4 scale-100 md:scale-120 w-full justify-center flex-row">
      <svg width="80" height="80" viewBox="0 0 100 100" className="md:w-[120px] md:h-[120px]">
        <circle cx="50" cy="50" r="44" fill="none" stroke="#2d4778" strokeWidth="8"/>
        <text x="50" y="65" textAnchor="middle" fill="#2d4778" className="text-4xl md:text-5xl font-bold font-outfit">$</text>
      </svg>
      <span className="font-inter text-6xl md:text-[9rem] text-[#2d4778] tracking-tighter break-keep leading-none text-center whitespace-nowrap flex items-center">
        <TypingText 
          text="finago.ai" 
          delay={200} 
          className="inline-block font-inter text-6xl md:text-[9rem] text-[#2d4778] font-poppins tracking-tight mt-2 md:mt-0 transition-all duration-500"
        />
      </span>
    </div>
  );
};

export default Logo;
