import React from 'react';
import { cn } from '../../utils/design-system';

interface ModernCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined' | 'glass' | 'gradient';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

export const ModernCard: React.FC<ModernCardProps> = ({
  children,
  className,
  variant = 'default',
  padding = 'md',
  hover = false,
  clickable = false,
  onClick
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'elevated':
        return cn(
          'bg-white dark:bg-slate-900',
          'shadow-lg shadow-black/5 dark:shadow-black/20',
          'border-0'
        );
      case 'outlined':
        return cn(
          'bg-white dark:bg-slate-900',
          'border border-slate-200 dark:border-slate-700',
          'shadow-sm'
        );
      case 'glass':
        return cn(
          'bg-white/80 dark:bg-slate-900/80',
          'backdrop-blur-md',
          'border border-white/20 dark:border-slate-700/20',
          'shadow-xl shadow-black/5 dark:shadow-black/20'
        );
      case 'gradient':
        return cn(
          'bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800',
          'border border-slate-200/50 dark:border-slate-700/50',
          'shadow-lg shadow-black/5 dark:shadow-black/20'
        );
      default:
        return cn(
          'bg-white dark:bg-slate-900',
          'border border-slate-200 dark:border-slate-700',
          'shadow-sm'
        );
    }
  };

  const getPaddingStyles = () => {
    switch (padding) {
      case 'none':
        return '';
      case 'sm':
        return 'p-3';
      case 'lg':
        return 'p-8';
      case 'xl':
        return 'p-12';
      default:
        return 'p-6';
    }
  };

  const getInteractiveStyles = () => {
    if (!hover && !clickable) return '';
    return cn(
      'transition-all duration-200 ease-out',
      'hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-black/30',
      'hover:-translate-y-1 hover:scale-[1.02]',
      clickable && 'cursor-pointer active:scale-[0.98]'
    );
  };

  return (
    <div
      className={cn(
        // Base styles
        'relative overflow-hidden rounded-2xl',
        // Variant styles
        getVariantStyles(),
        // Padding styles
        getPaddingStyles(),
        // Interactive styles
        getInteractiveStyles(),
        // Focus styles
        clickable && 'focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-2',
        className
      )}
      onClick={clickable ? onClick : undefined}
      tabIndex={clickable ? 0 : undefined}
      role={clickable ? 'button' : undefined}
    >
      {/* Gradient overlay for glass variant */}
      {variant === 'glass' && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent dark:from-white/5 pointer-events-none" />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Hover overlay */}
      {(hover || clickable) && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
      )}
    </div>
  );
};

export default ModernCard;