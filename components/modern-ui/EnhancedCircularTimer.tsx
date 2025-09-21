import React from 'react';
import { TimerState } from '../../types';
import { cn, getSessionColors } from '../../utils/design-system';
import { ModernProgressRing } from './ModernProgressRing';
import { AnimatedCounter } from './AnimatedCounter';
import { StatusIndicator } from './StatusIndicator';
import { GlassMorphismCard } from './GlassMorphismCard';

interface EnhancedCircularTimerProps {
  timerState: TimerState;
  isActive: boolean;
  settings: {
    durations: {
      work: number;
      shortBreak: number;
      longBreak: number;
    };
    soundUrl: string;
  };
  size?: number;
  showSessionInfo?: boolean;
  variant?: 'default' | 'glass' | 'minimal';
}

export const EnhancedCircularTimer: React.FC<EnhancedCircularTimerProps> = ({
  timerState,
  isActive,
  settings,
  size = 280,
  showSessionInfo = true,
  variant = 'default'
}) => {
  const remainingSec = timerState?.remainingSec ?? 0;
  const sessionType = timerState?.sessionType ?? 'work';
  const totalDuration = settings?.durations?.[sessionType] ?? 1500;

  // Calculate progress (0-100)
  const progress = ((totalDuration - remainingSec) / totalDuration) * 100;
  const mins = Math.floor(remainingSec / 60);
  const secs = remainingSec % 60;

  const sessionColors = getSessionColors(sessionType);

  const getSessionInfo = (type: string) => {
    switch (type) {
      case 'work':
        return { emoji: '🎯', label: 'Focus Session', status: 'active' as const };
      case 'shortBreak':
        return { emoji: '☕', label: 'Short Break', status: 'paused' as const };
      case 'longBreak':
        return { emoji: '🌟', label: 'Long Break', status: 'completed' as const };
      default:
        return { emoji: '⏱️', label: 'Session', status: 'inactive' as const };
    }
  };

  const sessionInfo = getSessionInfo(sessionType);

  const TimerContent = () => (
    <div className="flex flex-col items-center space-y-6">
      {/* Main Timer Ring */}
      <div className="relative">
        <ModernProgressRing
          progress={progress}
          size={size}
          strokeWidth={12}
          color={sessionColors.primary}
          animated={true}
          gradient={true}
        >
          {/* Digital Time Display */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-1 text-4xl md:text-5xl font-mono font-bold tracking-tight">
              <AnimatedCounter 
                value={mins} 
                className="text-fs-on-surface"
              />
              <span 
                className={cn(
                  'text-fs-on-surface',
                  isActive && 'animate-pulse'
                )}
              >
                :
              </span>
              <AnimatedCounter 
                value={secs} 
                className="text-fs-on-surface"
              />
            </div>
            {/* Progress Percentage */}
            <div className="mt-2 text-xs font-medium text-fs-on-surface-variant">
              <AnimatedCounter value={Math.round(progress)} suffix="%" />
            </div>
          </div>
        </ModernProgressRing>

        {/* Floating Status Indicator */}
        <div className="absolute -top-2 -right-2">
          <StatusIndicator
            status={isActive ? sessionInfo.status : 'inactive'}
            size="sm"
            animated={true}
          />
        </div>
      </div>

      {/* Session Information */}
      {showSessionInfo && (
        <div className="flex flex-col items-center space-y-3">
          {/* Session Type Badge */}
          <div className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-full',
            'bg-fs-surface-container-low backdrop-blur-sm',
            'shadow-lg border border-fs-outline/30',
            'transition-all duration-200 hover:shadow-xl hover:scale-105'
          )}>
            <span className="text-lg">{sessionInfo.emoji}</span>
            <span className="font-semibold text-sm uppercase tracking-wide text-fs-on-surface">
              {sessionInfo.label}
            </span>
          </div>

          {/* Session Counter */}
          <div className="text-xs text-fs-on-surface-variant font-medium">
            Session #<AnimatedCounter value={(timerState?.sessionCount ?? 0) + 1} className="font-bold" />
          </div>
        </div>
      )}
    </div>
  );

  if (variant === 'glass') {
    return (
      <GlassMorphismCard className="p-8">
        <TimerContent />
      </GlassMorphismCard>
    );
  }

  if (variant === 'minimal') {
    return <TimerContent />;
  }

  // Default variant with subtle card
  return (
    <div className={cn(
      'p-6 rounded-3xl',
      'bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800',
      'border border-slate-200/50 dark:border-slate-700/50',
      'shadow-xl shadow-black/5 dark:shadow-black/20',
      'transition-all duration-300 hover:shadow-2xl hover:shadow-black/10'
    )}>
      <TimerContent />
    </div>
  );
};

export default EnhancedCircularTimer;