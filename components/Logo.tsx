
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <circle cx="50" cy="50" r="48" fill="#EA580C" />
      <path 
        d="M30 70C30 70 35 40 50 40C65 40 70 70 70 70" 
        stroke="white" 
        strokeWidth="6" 
        strokeLinecap="round" 
      />
      <circle cx="50" cy="30" r="8" fill="white" />
      <path 
        d="M50 40V60" 
        stroke="white" 
        strokeWidth="4" 
        strokeLinecap="round" 
      />
      <path 
        d="M40 55H60" 
        stroke="white" 
        strokeWidth="4" 
        strokeLinecap="round" 
      />
    </svg>
  );
};

export default Logo;
