
import React from 'react';

const PlayIcon = ({ 
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
    <path d="M5 3l14 9-14 9V3z" />
  </svg>
);

export default PlayIcon;
