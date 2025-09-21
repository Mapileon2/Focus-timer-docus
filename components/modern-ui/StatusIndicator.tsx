import React from 'react';
import { cn } from '../../utils/design-system';

interface StatusIndicatorProps {
  status: 'active' | 'inactive' | 'paused' | 'completed' | 'error' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  showLabel?: boolean;
  animated?: boolean;
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  size = 'md',
  label,
  showLabel = false,
  animated = true,
  className
}) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'active':
        return {
          dot: 'bg-green-500 shadow-green-500/50',
          ring: 'ring-green-500/20',
          label: 'text-green-700 dark:text-green-400'
        };
      case 'paused':
        return {
          dot: 'bg-yellow-500 shadow-yellow-500/50',
          ring: 'ring-yellow-500/20',
          label: 'text-yellow-700 dark:text-yellow-400'
        };
      case 'completed':
        return {
          dot: 'bg-blue-500 shadow-blue-500/50',
          ring: 'ring-blue-500/20',
          label: 'text-blue-700 dark:text-blue-400'
        };
      case 'error':
        return {
          dot: 'bg-red-500 shadow-red-500/50',
          ring: 'ring-red-500/20',
          label: 'text-red-700 dark:text-red-400'
        };
      case 'warning':
        return {
          dot: 'bg-orange-500 shadow-orange-500/50',
          ring: 'ring-orange-500/20',
          label: 'text-orange-700 dark:text-orange-400'
        };
      default: // inactive
        return {
          dot: 'bg-slate-400 shadow-slate-400/50',
          ring: 'ring-slate-400/20',
          label: 'text-slate-700 dark:text-slate-400'
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          dot: 'w-2 h-2',
          ring: 'w-4 h-4',
          text: 'text-xs'
        };
      case 'lg':
        return {
          dot: 'w-4 h-4',
          ring: 'w-8 h-8',
          text: 'text-base'
        };
      default:
        return {
          dot: 'w-3 h-3',
          ring: 'w-6 h-6',
          text: 'text-sm'
        };
    }
  };

  const statusStyles = getStatusStyles();
  const sizeStyles = getSizeStyles();
  const displayLabel = label || status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Status dot with ring */}
      <div className="relative flex items-center justify-center">
        {/* Animated ring */}
        <div
          className={cn(
            'absolute rounded-full ring-2',
            statusStyles.ring,
            sizeStyles.ring,
            animated && status === 'active' && 'animate-pulse'
          )}
        />
        {/* Status dot */}
        <div
          className={cn(
            'rounded-full shadow-lg',
            statusStyles.dot,
            sizeStyles.dot,
            animated && status === 'active' && 'animate-pulse'
          )}
        />
      </div>

      {/* Label */}
      {showLabel && (
        <span
          className={cn(
            'font-medium',
            statusStyles.label,
            sizeStyles.text
          )}
        >
          {displayLabel}
        </span>
      )}
    </div>
  );
};

export default StatusIndicator;