
import React from 'react';

const ResetIcon = ({ 
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
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="m3 3v5h5" />
  </svg>
);

export default ResetIcon;
