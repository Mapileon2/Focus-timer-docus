import React from 'react';
import { TimerState } from '../../types';
import { NumberTicker } from '../magicui/number-ticker';

interface EnhancedTimerDisplayProps {
  timerState: TimerState;
}

const fmtMMSS = (seconds: number): string => {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
};

const sessionTypeLabels: { [key in TimerState['sessionType']]: string } = {
  work: "Focus Session",
  shortBreak: "Short Break",
  longBreak: "Long Break",
};

export const EnhancedTimerDisplay: React.FC<EnhancedTimerDisplayProps> = ({ timerState }) => {
  const remainingSec = timerState?.remainingSec ?? 0;
  const sessionType = timerState?.sessionType ?? 'work';
  const mins = Math.floor(remainingSec / 60);
  const secs = remainingSec % 60;

  const getSessionColor = (type: string) => {
    switch (type) {
      case 'work': return 'text-blue-600 dark:text-blue-400';
      case 'shortBreak': return 'text-green-600 dark:text-green-400';
      case 'longBreak': return 'text-purple-600 dark:text-purple-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getGradientColors = (type: string) => {
    switch (type) {
      case 'work': return 'from-blue-500 to-blue-600';
      case 'shortBreak': return 'from-green-500 to-green-600';
      case 'longBreak': return 'from-purple-500 to-purple-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 py-8">
      {/* Enhanced Timer Display with NumberTicker */}
      <div className="relative">
        <div className="flex items-center justify-center gap-1 text-7xl md:text-8xl font-mono font-bold tracking-tighter">
          <NumberTicker 
            value={mins} 
            className={`bg-gradient-to-br ${getGradientColors(sessionType)} bg-clip-text text-transparent`}
            decimalPlaces={0}
          />
          <span className={`bg-gradient-to-br ${getGradientColors(sessionType)} bg-clip-text text-transparent animate-pulse`}>
            :
          </span>
          <NumberTicker 
            value={secs} 
            className={`bg-gradient-to-br ${getGradientColors(sessionType)} bg-clip-text text-transparent`}
            decimalPlaces={0}
          />
        </div>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 text-7xl md:text-8xl font-mono font-bold tracking-tighter opacity-20 blur-sm -z-10 pointer-events-none">
          {fmtMMSS(remainingSec)}
        </div>
      </div>
      
      {/* Enhanced Session Info */}
      <div className="flex flex-col items-center space-y-3">
        <div className="flex items-center gap-3">
          <div className={`h-1 w-12 ${getSessionColor(sessionType).replace('text-', 'bg-')} rounded-full animate-pulse`}></div>
          <span className={`text-lg font-semibold ${getSessionColor(sessionType)} uppercase tracking-wide`}>
            {sessionTypeLabels[sessionType]}
          </span>
          <div className={`h-1 w-12 ${getSessionColor(sessionType).replace('text-', 'bg-')} rounded-full animate-pulse`}></div>
        </div>
        
        <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          Session #<NumberTicker value={(timerState?.sessionCount ?? 0) + 1} className="font-bold" />
        </div>
      </div>
    </div>
  );
};