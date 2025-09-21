import React from 'react';

const CheckCircleIcon = ({ 
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
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export default CheckCircleIcon;
