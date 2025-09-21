import React from 'react';

const KeyIcon = ({ 
  className = 'w-5 h-5',
  strokeWidth = 1.5,
  filled = false 
}: { 
  className?: string;
  strokeWidth?: number;
  filled?: boolean;
}) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill={filled ? "currentColor" : "none"} 
    stroke="currentColor" 
    className={className}
    strokeWidth={strokeWidth}
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="8" cy="8" r="6" />
    <path d="m15 9-6 6" />
    <path d="m20.5 9.5-1 1" />
    <path d="m15 14 5.5-5.5" />
  </svg>
);

export default KeyIcon;
