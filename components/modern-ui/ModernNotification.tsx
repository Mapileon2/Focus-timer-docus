import React, { useEffect, useState } from 'react';
import { cn } from '../../utils/design-system';
import { ModernButton } from './ModernButton';

interface ModernNotificationProps {
  title: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose?: () => void;
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'ghost';
  }>;
  icon?: React.ReactNode;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  showProgress?: boolean;
}

export const ModernNotification: React.FC<ModernNotificationProps> = ({
  title,
  message,
  type = 'info',
  duration = 5000,
  onClose,
  actions,
  icon,
  position = 'top-right',
  showProgress = true
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (duration > 0) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev - (100 / (duration / 100));
          if (newProgress <= 0) {
            clearInterval(interval);
            handleClose();
            return 0;
          }
          return newProgress;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose?.();
    }, 300);
  };

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800/30',
          icon: '✅',
          iconColor: 'text-green-600 dark:text-green-400',
          progressColor: 'bg-green-500'
        };
      case 'error':
        return {
          bg: 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/30',
          icon: '❌',
          iconColor: 'text-red-600 dark:text-red-400',
          progressColor: 'bg-red-500'
        };
      case 'warning':
        return {
          bg: 'bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800/30',
          icon: '⚠️',
          iconColor: 'text-orange-600 dark:text-orange-400',
          progressColor: 'bg-orange-500'
        };
      default:
        return {
          bg: 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800/30',
          icon: 'ℹ️',
          iconColor: 'text-blue-600 dark:text-blue-400',
          progressColor: 'bg-blue-500'
        };
    }
  };

  const getPositionStyles = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'top-center':
        return 'top-4 left-1/2 transform -translate-x-1/2';
      case 'bottom-center':
        return 'bottom-4 left-1/2 transform -translate-x-1/2';
      default:
        return 'top-4 right-4';
    }
  };

  const typeStyles = getTypeStyles();

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed z-50 max-w-sm w-full',
        getPositionStyles(),
        'animate-in slide-in-from-right-full duration-300',
        !isVisible && 'animate-out slide-out-to-right-full duration-300'
      )}
      style={{ '--notification-progress-width': `${progress}%` } as React.CSSProperties}
    >
      <div className={cn(
        'relative overflow-hidden rounded-2xl border shadow-lg backdrop-blur-sm',
        typeStyles.bg,
        'transform transition-all duration-300 hover:scale-105'
      )}>
        {/* Progress Bar */}
        {showProgress && duration > 0 && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-700">
            <div
              className={cn('h-full transition-all duration-100 ease-linear', typeStyles.progressColor)}
              style={{ width: `var(--notification-progress-width)` }}
            />
          </div>
        )}

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className={cn('flex-shrink-0 text-lg', typeStyles.iconColor)}>
              {icon || typeStyles.icon}
            </div>

            {/* Text Content */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">
                {title}
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {message}
              </p>

              {/* Actions */}
              {actions && actions.length > 0 && (
                <div className="flex items-center gap-2 mt-3">
                  {actions.map((action, index) => (
                    <ModernButton
                      key={index}
                      variant={action.variant || 'ghost'}
                      size="sm"
                      onClick={action.onClick}
                      className="h-8 px-3 text-xs"
                    >
                      {action.label}
                    </ModernButton>
                  ))}
                </div>
              )}
            </div>

            {/* Close Button */}
            <ModernButton
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="flex-shrink-0 w-6 h-6 p-0 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              <span className="text-xs">✕</span>
            </ModernButton>
          </div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

export default ModernNotification;