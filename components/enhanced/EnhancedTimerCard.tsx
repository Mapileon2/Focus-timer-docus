import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { MagicCard } from '../magicui/magic-card';
import { BorderBeam } from '../magicui/border-beam';
import { EnhancedTimerDisplay } from './EnhancedTimerDisplay';
import { EnhancedControlButtons } from './EnhancedControlButtons';
import { TimerState } from '../../types';

interface EnhancedTimerCardProps {
  timerState: TimerState;
  isActive: boolean;
  settings: any;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkip: () => void;
}

export const EnhancedTimerCard: React.FC<EnhancedTimerCardProps> = ({
  timerState,
  isActive,
  settings,
  onStart,
  onPause,
  onReset,
  onSkip,
}) => {
  const getSessionTypeDisplay = (type: string) => {
    switch (type) {
      case 'work': return { 
        label: 'Focus', 
        emoji: '🎯', 
        color: 'bg-blue-500', 
        textColor: 'text-blue-600',
        gradientFrom: '#3B82F6',
        gradientTo: '#1D4ED8'
      };
      case 'shortBreak': return { 
        label: 'Break', 
        emoji: '☕', 
        color: 'bg-green-500', 
        textColor: 'text-green-600',
        gradientFrom: '#10B981',
        gradientTo: '#059669'
      };
      case 'longBreak': return { 
        label: 'Rest', 
        emoji: '🌟', 
        color: 'bg-purple-500', 
        textColor: 'text-purple-600',
        gradientFrom: '#8B5CF6',
        gradientTo: '#7C3AED'
      };
      default: return { 
        label: 'Session', 
        emoji: '⏱️', 
        color: 'bg-gray-500', 
        textColor: 'text-gray-600',
        gradientFrom: '#6B7280',
        gradientTo: '#4B5563'
      };
    }
  };

  const sessionDisplay = getSessionTypeDisplay(timerState.sessionType);
  const progressValue = ((settings.durations[timerState.sessionType] - timerState.remainingSec) / (settings.durations[timerState.sessionType] || 1)) * 100;

  return (
    <div className="relative">
      <MagicCard 
        className="border-0 shadow-xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm"
        gradientFrom={sessionDisplay.gradientFrom}
        gradientTo={sessionDisplay.gradientTo}
        gradientSize={300}
      >
        {/* Animated border beam when timer is active */}
        {isActive && (
          <BorderBeam
            size={100}
            duration={8}
            colorFrom={sessionDisplay.gradientFrom}
            colorTo={sessionDisplay.gradientTo}
            borderWidth={2}
          />
        )}

        <CardHeader className="pb-4">
          <div className="flex items-center justify-center">
            <Badge
              variant="secondary"
              className={`${sessionDisplay.textColor} bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 border-0 px-4 py-2 text-sm font-semibold shadow-sm animate-pulse`}
            >
              <span className="mr-2 text-lg">{sessionDisplay.emoji}</span>
              {sessionDisplay.label} Session
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Enhanced Timer Display */}
          <EnhancedTimerDisplay timerState={timerState} />

          {/* Enhanced Progress Bar */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm font-medium text-slate-600 dark:text-slate-400">
              <span>Progress</span>
              <span>{Math.round(progressValue)}%</span>
            </div>
            <div className="relative">
              <Progress
                value={progressValue}
                className="h-3 bg-slate-200 dark:bg-slate-700"
              />
              {/* Shimmer effect on progress bar */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none animate-pulse" />
            </div>
          </div>

          {/* Enhanced Control Buttons */}
          <EnhancedControlButtons
            isActive={isActive}
            sessionType={timerState.sessionType}
            onStart={onStart}
            onPause={onPause}
            onReset={onReset}
            onSkip={onSkip}
          />
        </CardContent>
      </MagicCard>
    </div>
  );
};