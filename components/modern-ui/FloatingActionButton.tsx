import React from 'react';
import { cn } from '../../utils/design-system';

interface FloatingActionButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'success' | 'warning';
  className?: string;
  disabled?: boolean;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onClick,
  icon,
  label,
  position = 'bottom-right',
  size = 'md',
  variant = 'primary',
  className,
  disabled = false
}) => {
  const getPositionStyles = () => {
    switch (position) {
      case 'bottom-left':
        return 'bottom-6 left-6';
      case 'top-right':
        return 'top-6 right-6';
      case 'top-left':
        return 'top-6 left-6';
      default:
        return 'bottom-6 right-6';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'w-12 h-12 text-sm';
      case 'lg':
        return 'w-16 h-16 text-xl';
      default:
        return 'w-14 h-14 text-lg';
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-slate-600 hover:bg-slate-700 text-white shadow-slate-500/25';
      case 'success':
        return 'bg-green-600 hover:bg-green-700 text-white shadow-green-500/25';
      case 'warning':
        return 'bg-orange-600 hover:bg-orange-700 text-white shadow-orange-500/25';
      default:
        return 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25';
    }
  };

  return (
    <div className={cn('fixed z-50', getPositionStyles())}>
      <button
        onClick={onClick}
        disabled={disabled}
        className={cn(
          // Base styles
          'relative flex items-center justify-center',
          'rounded-full font-medium',
          'transition-all duration-300 ease-out',
          'transform hover:scale-110 active:scale-95',
          'shadow-lg hover:shadow-xl',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500/20',
          // Size and variant styles
          getSizeStyles(),
          getVariantStyles(),
          // Disabled styles
          disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
          className
        )}
        aria-label={label}
      >
        {/* Icon */}
        <span className="flex items-center justify-center">
          {icon}
        </span>
        
        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </button>
      
      {/* Tooltip */}
      {label && (
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="bg-slate-900 text-white text-sm px-2 py-1 rounded-lg whitespace-nowrap">
            {label}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingActionButton;