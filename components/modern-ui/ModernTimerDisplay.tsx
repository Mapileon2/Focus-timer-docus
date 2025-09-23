import React, { useState, useEffect } from 'react';
import { cn } from '../../utils/design-system';
import { AnimatedCounter } from './AnimatedCounter';
import { StatusIndicator } from './StatusIndicator';
import { Badge } from '../ui/badge';

interface ModernTimerDisplayProps {
  remainingSeconds: number;
  sessionType: 'work' | 'shortBreak' | 'longBreak';
  sessionCount: number;
  isActive: boolean;
  totalDuration: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showProgress?: boolean;
  showSessionInfo?: boolean;
}

export const ModernTimerDisplay: React.FC<ModernTimerDisplayProps> = ({
  remainingSeconds,
  sessionType,
  sessionCount,
  isActive,
  totalDuration,
  className,
  size = 'lg',
  showProgress = true,
  showSessionInfo = true
}) => {
  const [pulseActive, setPulseActive] = useState(false);
  
  const mins = Math.floor(remainingSeconds / 60);
  const secs = remainingSeconds % 60;
  const progress = ((totalDuration - remainingSeconds) / totalDuration) * 100;

  // Pulse effect when timer is running low (last 10%)
  useEffect(() => {
    const isLowTime = (remainingSeconds / totalDuration) <= 0.1;
    setPulseActive(isActive && isLowTime);
  }, [remainingSeconds, totalDuration, isActive]);

  const getSessionInfo = () => {
    switch (sessionType) {
      case 'work':
        return { 
          emoji: '🎯', 
          label: 'Focus Session', 
          color: 'from-blue-500 to-blue-600',
          bgColor: 'bg-blue-50 dark:bg-blue-950/20',
          textColor: 'text-blue-600 dark:text-blue-400'
        };
      case 'shortBreak':
        return { 
          emoji: '☕', 
          label: 'Short Break', 
          color: 'from-green-500 to-green-600',
          bgColor: 'bg-green-50 dark:bg-green-950/20',
          textColor: 'text-green-600 dark:text-green-400'
        };
      case 'longBreak':
        return { 
          emoji: '🌟', 
          label: 'Long Break', 
          color: 'from-purple-500 to-purple-600',
          bgColor: 'bg-purple-50 dark:bg-purple-950/20',
          textColor: 'text-purple-600 dark:text-purple-400'
        };
      default:
        return { 
          emoji: '⏱️', 
          label: 'Session', 
          color: 'from-slate-500 to-slate-600',
          bgColor: 'bg-slate-50 dark:bg-slate-950/20',
          textColor: 'text-slate-600 dark:text-slate-400'
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          timer: 'text-4xl md:text-5xl',
          container: 'space-y-3',
          badge: 'text-xs px-3 py-1',
          session: 'text-xs'
        };
      case 'md':
        return {
          timer: 'text-5xl md:text-6xl',
          container: 'space-y-4',
          badge: 'text-sm px-4 py-2',
          session: 'text-sm'
        };
      case 'xl':
        return {
          timer: 'text-7xl md:text-8xl',
          container: 'space-y-8',
          badge: 'text-base px-6 py-3',
          session: 'text-base'
        };
      default: // lg
        return {
          timer: 'text-6xl md:text-7xl',
          container: 'space-y-6',
          badge: 'text-sm px-4 py-2',
          session: 'text-sm'
        };
    }
  };

  const sessionInfo = getSessionInfo();
  const sizeStyles = getSizeStyles();

  return (
    <div className={cn(
      'flex flex-col items-center justify-center text-center',
      sizeStyles.container,
      className
    )}>
      {/* Session Badge */}
      {showSessionInfo && (
        <div className="flex items-center gap-3">
          <StatusIndicator
            status={isActive ? 'active' : 'paused'}
            size="sm"
            animated={isActive}
          />
          <Badge 
            className={cn(
              'font-semibold border-0 shadow-lg',
              sessionInfo.bgColor,
              sessionInfo.textColor,
              sizeStyles.badge
            )}
          >
            <span className="mr-2 text-lg">{sessionInfo.emoji}</span>
            {sessionInfo.label}
          </Badge>
          <StatusIndicator
            status={isActive ? 'active' : 'paused'}
            size="sm"
            animated={isActive}
          />
        </div>
      )}

      {/* Digital Timer Display */}
      <div className="relative">
        {/* Main timer */}
        <div 
          className={cn(
            'font-mono font-bold tracking-tighter select-none',
            `bg-gradient-to-br ${sessionInfo.color} bg-clip-text text-transparent`,
            sizeStyles.timer,
            pulseActive && 'animate-pulse',
            'drop-shadow-lg'
          )}
          aria-label={`Time remaining: ${mins} minutes and ${secs} seconds`}
        >
          <div className="flex items-center justify-center gap-2">
            <AnimatedCounter 
              value={mins} 
              className="tabular-nums"
              duration={300}
            />
            <span className={cn(
              'transition-opacity duration-200',
              isActive ? 'animate-pulse' : 'opacity-70'
            )}>
              :
            </span>
            <AnimatedCounter 
              value={secs} 
              className="tabular-nums"
              duration={300}
            />
          </div>
        </div>
        
        {/* Glow effect */}
        <div className={cn(
          'absolute inset-0 font-mono font-bold tracking-tighter opacity-20 blur-lg -z-10 pointer-events-none',
          sizeStyles.timer,
          `bg-gradient-to-br ${sessionInfo.color} bg-clip-text text-transparent`
        )}>
          {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
        </div>

        {/* Pulse ring for low time */}
        {pulseActive && (
          <div className={cn(
            'absolute inset-0 rounded-full border-4 animate-ping',
            sessionInfo.textColor.replace('text-', 'border-'),
            'opacity-30'
          )} />
        )}
      </div>

      {/* Progress Information */}
      {showProgress && (
        <div className="flex flex-col items-center space-y-2">
          <div className={cn(
            'text-xs font-medium uppercase tracking-wide',
            sessionInfo.textColor
          )}>
            <AnimatedCounter value={Math.round(progress)} suffix="% Complete" />
          </div>
          
          {showSessionInfo && (
            <div className={cn(
              'font-medium',
              sessionInfo.textColor,
              sizeStyles.session
            )}>
              Session #{sessionCount + 1}
            </div>
          )}
        </div>
      )}

      {/* Breathing indicator when active */}
      {isActive && (
        <div className="flex items-center gap-2 mt-2">
          <div className={cn(
            'w-2 h-2 rounded-full animate-pulse',
            sessionInfo.color.includes('blue') ? 'bg-blue-500' :
            sessionInfo.color.includes('green') ? 'bg-green-500' :
            'bg-purple-500'
          )} />
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Timer Active
          </span>
          <div className={cn(
            'w-2 h-2 rounded-full animate-pulse',
            sessionInfo.color.includes('blue') ? 'bg-blue-500' :
            sessionInfo.color.includes('green') ? 'bg-green-500' :
            'bg-purple-500'
          )} />
        </div>
      )}
    </div>
  );
};

export default ModernTimerDisplay;