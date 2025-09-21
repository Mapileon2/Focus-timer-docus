import React, { useState, useRef, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { cn } from '../../utils/design-system';
import { useTheme } from '@/hooks/useTheme';

interface ModernButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'gradient' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
}

const ModernButton = React.forwardRef<HTMLButtonElement, ModernButtonProps>((
  { children, className, variant = 'primary', size = 'md', icon, iconPosition = 'left', loading = false, fullWidth = false, disabled, ...props },
  ref
) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [rippleActive, setRippleActive] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  
  // Spring animation for button interactions
  const springProps = useSpring({
    scale: isPressed ? 0.95 : isHovered ? 1.05 : 1,
    shadow: isPressed ? '0 4px 12px rgba(0,0,0,0.15)' : isHovered ? '0 8px 24px rgba(0,0,0,0.2)' : '0 4px 16px rgba(0,0,0,0.1)',
    config: { tension: 300, friction: 20 }
  });

  // Ripple effect
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setRippleActive(true);
    setTimeout(() => setRippleActive(false), 600);
    props.onClick?.(e);
  };

  // Base styles
  const baseStyles = cn(
    'relative inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'font-medium transition-all duration-300',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
    'disabled:pointer-events-none disabled:opacity-50',
    'transform-gpu transition-transform duration-200 hover:scale-105 active:scale-95',
    className
  );

  // Size styles
  const sizeStyles = {
    sm: 'h-9 px-4 text-sm font-medium rounded-lg',
    md: 'h-11 px-5 text-sm font-semibold rounded-xl',
    lg: 'h-13 px-6 text-base font-semibold rounded-xl',
    xl: 'h-15 px-8 text-base font-semibold rounded-xl'
  }[size];

  // Variant styles with dark mode support
  const variantStyles = {
    primary: cn(
      isDark
        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
        : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg',
      isDark
        ? 'hover:from-blue-600 hover:to-blue-700 hover:shadow-xl'
        : 'hover:from-blue-700 hover:to-blue-800 hover:shadow-xl',
      'focus-visible:ring-blue-400',
      'active:shadow-md active:translate-y-0.5',
      'border border-blue-500/20'
    ),
    secondary: cn(
      isDark
        ? 'bg-gradient-to-r from-slate-500 to-slate-600 text-white shadow-lg'
        : 'bg-gradient-to-r from-slate-600 to-slate-700 text-white shadow-lg',
      isDark
        ? 'hover:from-slate-600 hover:to-slate-700 hover:shadow-xl'
        : 'hover:from-slate-700 hover:to-slate-800 hover:shadow-xl',
      'focus-visible:ring-slate-400',
      'active:shadow-md active:translate-y-0.5',
      'border border-slate-500/20'
    ),
    ghost: cn(
      isDark
        ? 'text-slate-300 hover:bg-slate-800/50 hover:text-blue-400'
        : 'text-slate-700 hover:bg-slate-100/50 hover:text-blue-600',
      'focus-visible:ring-blue-300',
      isDark
        ? 'active:bg-slate-700/70'
        : 'active:bg-slate-200/70',
      'border border-transparent',
      isDark
        ? 'hover:border-slate-600'
        : 'hover:border-slate-300'
    ),
    gradient: cn(
      'relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 text-white shadow-2xl',
      'hover:from-purple-700 hover:via-blue-700 hover:to-green-700 hover:shadow-3xl hover:brightness-110',
      'focus-visible:ring-blue-400/50',
      'active:shadow-xl active:brightness-95',
      'before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0',
      'hover:before:opacity-100 before:transition-all before:duration-500',
      'after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:to-white/10 after:opacity-0',
      'hover:after:opacity-100 after:transition-all after:duration-700',
      'border border-white/20'
    ),
    glass: cn(
      isDark
        ? 'bg-slate-900/20 backdrop-blur-lg border border-white/25 text-white shadow-glass'
        : 'bg-white/20 backdrop-blur-lg border border-white/25 text-slate-900 shadow-glass',
      isDark
        ? 'hover:bg-slate-900/30 hover:border-white/35 hover:backdrop-blur-xl'
        : 'hover:bg-white/30 hover:border-white/35 hover:backdrop-blur-xl',
      'focus-visible:ring-white/30 focus-visible:ring-offset-white/10',
      isDark
        ? 'active:bg-slate-900/25 active:backdrop-blur-md'
        : 'active:bg-white/25 active:backdrop-blur-md',
      'transition-all duration-500 ease-out'
    )
  }[variant];

  const isDisabled = disabled || loading;

  return (
    <animated.button
      ref={ref}
      className={cn(
        baseStyles,
        sizeStyles,
        variantStyles,
        fullWidth && 'w-full',
        'relative overflow-hidden',
        'transition-all duration-200 ease-out',
        isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        rippleActive && 'animate-pulse',
        className
      )}
      disabled={isDisabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={handleClick}
      style={springProps}
      {...props}
    >
      {/* Loading spinner */}
      {loading && (
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {/* Content */}
      <div className={cn('flex items-center gap-2', loading && 'opacity-0')}>
        {icon && iconPosition === 'left' && (
          <span className="flex-shrink-0">{icon}</span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <span className="flex-shrink-0">{icon}</span>
        )}
      </div>

      {/* Gradient overlay for gradient variant */}
      {variant === 'gradient' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      )}
    </animated.button>
  );
});

export { ModernButton };
export default ModernButton;