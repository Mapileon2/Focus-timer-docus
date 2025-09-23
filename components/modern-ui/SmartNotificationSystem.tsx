import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '../../utils/design-system';
import { ModernButton } from './ModernButton';
import { StatusIndicator } from './StatusIndicator';
import { Badge } from '../ui/badge';

interface NotificationAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: React.ReactNode;
}

interface SmartNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'celebration';
  duration?: number;
  persistent?: boolean;
  actions?: NotificationAction[];
  icon?: React.ReactNode;
  progress?: number;
  sessionType?: 'work' | 'shortBreak' | 'longBreak';
}

interface SmartNotificationSystemProps {
  notifications: SmartNotification[];
  onDismiss: (id: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center';
  maxVisible?: number;
}

export const SmartNotificationSystem: React.FC<SmartNotificationSystemProps> = ({
  notifications,
  onDismiss,
  position = 'top-right',
  maxVisible = 3
}) => {
  const [visibleNotifications, setVisibleNotifications] = useState<SmartNotification[]>([]);
  const [animatingOut, setAnimatingOut] = useState<Set<string>>(new Set());

  useEffect(() => {
    setVisibleNotifications(notifications.slice(0, maxVisible));
  }, [notifications, maxVisible]);

  const getPositionStyles = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'center':
        return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
      default:
        return 'top-4 right-4';
    }
  };

  const getTypeStyles = (type: SmartNotification['type']) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20',
          border: 'border-green-200 dark:border-green-800/30',
          icon: '✅',
          iconColor: 'text-green-600 dark:text-green-400',
          titleColor: 'text-green-800 dark:text-green-200'
        };
      case 'error':
        return {
          bg: 'bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20',
          border: 'border-red-200 dark:border-red-800/30',
          icon: '❌',
          iconColor: 'text-red-600 dark:text-red-400',
          titleColor: 'text-red-800 dark:text-red-200'
        };
      case 'warning':
        return {
          bg: 'bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20',
          border: 'border-orange-200 dark:border-orange-800/30',
          icon: '⚠️',
          iconColor: 'text-orange-600 dark:text-orange-400',
          titleColor: 'text-orange-800 dark:text-orange-200'
        };
      case 'celebration':
        return {
          bg: 'bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-blue-950/20',
          border: 'border-purple-200 dark:border-purple-800/30',
          icon: '🎉',
          iconColor: 'text-purple-600 dark:text-purple-400',
          titleColor: 'text-purple-800 dark:text-purple-200'
        };
      default: // info
        return {
          bg: 'bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20',
          border: 'border-blue-200 dark:border-blue-800/30',
          icon: 'ℹ️',
          iconColor: 'text-blue-600 dark:text-blue-400',
          titleColor: 'text-blue-800 dark:text-blue-200'
        };
    }
  };

  const handleDismiss = useCallback((id: string) => {
    setAnimatingOut(prev => new Set(prev).add(id));
    setTimeout(() => {
      onDismiss(id);
      setAnimatingOut(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 300);
  }, [onDismiss]);

  const NotificationCard: React.FC<{ notification: SmartNotification; index: number }> = ({ 
    notification, 
    index 
  }) => {
    const [progress, setProgress] = useState(100);
    const typeStyles = getTypeStyles(notification.type);
    const isAnimatingOut = animatingOut.has(notification.id);

    // Auto-dismiss timer
    useEffect(() => {
      if (notification.persistent || !notification.duration) return;

      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev - (100 / (notification.duration! / 100));
          if (newProgress <= 0) {
            clearInterval(interval);
            handleDismiss(notification.id);
            return 0;
          }
          return newProgress;
        });
      }, 100);

      return () => clearInterval(interval);
    }, [notification.duration, notification.persistent, notification.id]);

    return (
      <div
        className={cn(
          'relative max-w-sm w-full overflow-hidden rounded-2xl border shadow-xl backdrop-blur-md',
          'transform transition-all duration-300 ease-out',
          typeStyles.bg,
          typeStyles.border,
          isAnimatingOut 
            ? 'opacity-0 scale-95 translate-x-full' 
            : 'opacity-100 scale-100 translate-x-0',
          'hover:scale-105 hover:shadow-2xl'
        )}
        style={{
          animationDelay: `${index * 100}ms`,
          zIndex: 1000 - index
        }}
      >
        {/* Progress bar */}
        {notification.duration && !notification.persistent && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-slate-200/50 dark:bg-slate-700/50">
            <div
              className={cn(
                'h-full transition-all duration-100 ease-linear',
                notification.type === 'success' ? 'bg-green-500' :
                notification.type === 'error' ? 'bg-red-500' :
                notification.type === 'warning' ? 'bg-orange-500' :
                notification.type === 'celebration' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                'bg-blue-500'
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className={cn(
              'flex-shrink-0 text-xl transition-transform duration-200',
              typeStyles.iconColor,
              notification.type === 'celebration' && 'animate-bounce'
            )}>
              {notification.icon || typeStyles.icon}
            </div>

            {/* Text Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className={cn(
                  'text-sm font-bold',
                  typeStyles.titleColor
                )}>
                  {notification.title}
                </h4>
                
                {notification.sessionType && (
                  <Badge variant="secondary" className="text-xs">
                    {notification.sessionType === 'work' ? '🎯 Focus' :
                     notification.sessionType === 'shortBreak' ? '☕ Break' :
                     '🌟 Rest'}
                  </Badge>
                )}
              </div>
              
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {notification.message}
              </p>

              {/* Progress indicator for session notifications */}
              {notification.progress !== undefined && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-600 dark:text-slate-400">Progress</span>
                    <span className="font-bold">{Math.round(notification.progress)}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                    <div
                      className={cn(
                        'h-1.5 rounded-full transition-all duration-500',
                        notification.sessionType === 'work' ? 'bg-blue-500' :
                        notification.sessionType === 'shortBreak' ? 'bg-green-500' :
                        'bg-purple-500'
                      )}
                      style={{ width: `${Math.min(notification.progress, 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Actions */}
              {notification.actions && notification.actions.length > 0 && (
                <div className="flex items-center gap-2 mt-4">
                  {notification.actions.map((action, actionIndex) => (
                    <ModernButton
                      key={actionIndex}
                      variant={action.variant || 'ghost'}
                      size="sm"
                      onClick={action.onClick}
                      icon={action.icon}
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
              onClick={() => handleDismiss(notification.id)}
              className="flex-shrink-0 w-6 h-6 p-0 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
              aria-label="Dismiss notification"
            >
              <span className="text-xs">✕</span>
            </ModernButton>
          </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none rounded-2xl" />
        
        {/* Celebration sparkles */}
        {notification.type === 'celebration' && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping"
                style={{
                  left: `${20 + (i * 15)}%`,
                  top: `${10 + (i % 2) * 20}%`,
                  animationDelay: `${i * 200}ms`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn(
      'fixed z-50 space-y-3 max-w-sm',
      getPositionStyles()
    )}>
      {visibleNotifications.map((notification, index) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          index={index}
        />
      ))}
      
      {/* Overflow indicator */}
      {notifications.length > maxVisible && (
        <div className="text-center">
          <Badge variant="secondary" className="text-xs">
            +{notifications.length - maxVisible} more
          </Badge>
        </div>
      )}
    </div>
  );
};

// Hook for managing notifications
export const useSmartNotifications = () => {
  const [notifications, setNotifications] = useState<SmartNotification[]>([]);

  const addNotification = useCallback((notification: Omit<SmartNotification, 'id'>) => {
    const id = `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newNotification: SmartNotification = {
      ...notification,
      id,
      duration: notification.duration ?? 5000
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    return id;
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // Session-specific notification helpers
  const notifySessionComplete = useCallback((sessionType: 'work' | 'shortBreak' | 'longBreak') => {
    const sessionInfo = {
      work: { emoji: '🎯', label: 'Focus Session', nextAction: 'Take a break!' },
      shortBreak: { emoji: '☕', label: 'Short Break', nextAction: 'Back to work!' },
      longBreak: { emoji: '🌟', label: 'Long Break', nextAction: 'Ready to focus!' }
    };

    const info = sessionInfo[sessionType];
    
    return addNotification({
      title: `${info.label} Complete!`,
      message: `Great job! ${info.nextAction}`,
      type: 'celebration',
      sessionType,
      icon: info.emoji,
      duration: 8000,
      actions: [
        {
          label: 'Continue',
          onClick: () => {},
          variant: 'primary',
          icon: <span>▶️</span>
        },
        {
          label: 'Take Break',
          onClick: () => {},
          variant: 'secondary',
          icon: <span>☕</span>
        }
      ]
    });
  }, [addNotification]);

  const notifyTimerStarted = useCallback((sessionType: 'work' | 'shortBreak' | 'longBreak', duration: number) => {
    const sessionInfo = {
      work: { emoji: '🎯', label: 'Focus Time', color: 'blue' },
      shortBreak: { emoji: '☕', label: 'Break Time', color: 'green' },
      longBreak: { emoji: '🌟', label: 'Rest Time', color: 'purple' }
    };

    const info = sessionInfo[sessionType];
    
    return addNotification({
      title: `${info.label} Started`,
      message: `${Math.floor(duration / 60)} minutes of focused ${sessionType === 'work' ? 'work' : 'rest'} time.`,
      type: 'info',
      sessionType,
      icon: info.emoji,
      duration: 3000
    });
  }, [addNotification]);

  const notifyError = useCallback((title: string, message: string, actions?: NotificationAction[]) => {
    return addNotification({
      title,
      message,
      type: 'error',
      persistent: true,
      actions
    });
  }, [addNotification]);

  const notifySuccess = useCallback((title: string, message: string, duration = 4000) => {
    return addNotification({
      title,
      message,
      type: 'success',
      duration
    });
  }, [addNotification]);

  return {
    notifications,
    addNotification,
    dismissNotification,
    clearAll,
    notifySessionComplete,
    notifyTimerStarted,
    notifyError,
    notifySuccess
  };
};

export default SmartNotificationSystem;