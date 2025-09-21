
import React from 'react';
import { TimerState } from '../types';

interface TimerDisplayProps {
  timerState: TimerState;
}

const fmtMMSS = (seconds: number): string => {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
};

const sessionTypeLabels: { [key in TimerState['sessionType']]: string } = {
  work: "Work Session",
  shortBreak: "Short Break",
  longBreak: "Long Break",
};

const TimerDisplay = ({ timerState }: TimerDisplayProps) => {
  const remainingSec = timerState?.remainingSec ?? 0;
  const sessionType = timerState?.sessionType ?? 'work';

  const getSessionColor = (type: string) => {
    switch (type) {
      case 'work': return 'text-blue-600 dark:text-blue-400';
      case 'shortBreak': return 'text-green-600 dark:text-green-400';
      case 'longBreak': return 'text-purple-600 dark:text-purple-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 py-8">
      {/* Main Timer Display */}
      <div className="relative">
        <div 
          className="text-7xl md:text-8xl font-mono font-bold tracking-tighter text-gray-900 dark:text-gray-100 select-none"
          aria-label={`Time remaining ${fmtMMSS(remainingSec)}`}
          data-testid="timer-display"
        >
          {fmtMMSS(remainingSec)}
        </div>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 text-7xl md:text-8xl font-mono font-bold tracking-tighter opacity-20 blur-sm -z-10 pointer-events-none">
          {fmtMMSS(remainingSec)}
        </div>
      </div>
      
      {/* Session Info */}
      <div className="flex flex-col items-center space-y-2">
        <div className="flex items-center gap-3">
          <div className={`h-1 w-12 ${getSessionColor(sessionType).replace('text-', 'bg-')} rounded-full`}></div>
          <span className={`text-lg font-semibold ${getSessionColor(sessionType)} uppercase tracking-wide`}>
            {sessionTypeLabels[sessionType]}
          </span>
          <div className={`h-1 w-12 ${getSessionColor(sessionType).replace('text-', 'bg-')} rounded-full`}></div>
        </div>
        
        <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          Session #{(timerState?.sessionCount ?? 0) + 1}
        </div>
      </div>
    </div>
  );
};

export default TimerDisplay;
