import React from 'react';

const SettingsIcon = ({ 
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
    <path d="M12.378 3.586a1.5 1.5 0 0 0-2.756 0L8.588 5.77a1.5 1.5 0 0 1-1.133.82l-2.34.34a1.5 1.5 0 0 0-.83 2.558l1.693 1.65a1.5 1.5 0 0 1 .432 1.327l-.4 2.332a1.5 1.5 0 0 0 2.176 1.58l2.097-1.103a1.5 1.5 0 0 1 1.394 0l2.097 1.103a1.5 1.5 0 0 0 2.176-1.58l-.4-2.332a1.5 1.5 0 0 1 .432-1.327l1.693-1.65a1.5 1.5 0 0 0-.83-2.558l-2.34-.34a1.5 1.5 0 0 1-1.133-.82l-1.034-2.184Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default SettingsIcon;
