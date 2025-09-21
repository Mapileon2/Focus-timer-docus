import React from 'react';
import { ShimmerButton } from '../magicui/shimmer-button';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import PlayIcon from '../icons/PlayIcon';
import PauseIcon from '../icons/PauseIcon';
import ResetIcon from '../icons/ResetIcon';
import SkipIcon from '../icons/SkipIcon';

interface EnhancedControlButtonsProps {
  isActive: boolean;
  sessionType: string;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkip: () => void;
}

export const EnhancedControlButtons: React.FC<EnhancedControlButtonsProps> = ({
  isActive,
  sessionType,
  onStart,
  onPause,
  onReset,
  onSkip,
}) => {
  const getSessionColors = (type: string) => {
    switch (type) {
      case 'work': 
        return {
          primary: 'from-blue-500 to-blue-600',
          shimmer: '#60A5FA',
          bg: 'linear-gradient(135deg, #3B82F6, #1D4ED8)'
        };
      case 'shortBreak': 
        return {
          primary: 'from-green-500 to-green-600',
          shimmer: '#34D399',
          bg: 'linear-gradient(135deg, #10B981, #059669)'
        };
      case 'longBreak': 
        return {
          primary: 'from-purple-500 to-purple-600',
          shimmer: '#A78BFA',
          bg: 'linear-gradient(135deg, #8B5CF6, #7C3AED)'
        };
      default: 
        return {
          primary: 'from-gray-500 to-gray-600',
          shimmer: '#9CA3AF',
          bg: 'linear-gradient(135deg, #6B7280, #4B5563)'
        };
    }
  };

  const colors = getSessionColors(sessionType);

  return (
    <div className="flex items-center justify-center gap-6 pt-2">
      {/* Reset Button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="lg"
            onClick={onReset}
            className="h-14 w-14 rounded-full border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
          >
            <ResetIcon className="w-5 h-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Reset Timer</p>
        </TooltipContent>
      </Tooltip>

      {/* Main Play/Pause Button with Shimmer Effect */}
      <div className="relative">
        <ShimmerButton
          onClick={isActive ? onPause : onStart}
          shimmerColor={colors.shimmer}
          background={colors.bg}
          borderRadius="50%"
          shimmerDuration="2s"
          className="h-18 w-18 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0"
        >
          {isActive ? (
            <PauseIcon className="w-8 h-8" />
          ) : (
            <PlayIcon className="w-8 h-8" />
          )}
        </ShimmerButton>
      </div>

      {/* Skip Button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="lg"
            onClick={onSkip}
            className="h-14 w-14 rounded-full border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
          >
            <SkipIcon className="w-5 h-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Skip Session</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};