import React, { useState, useRef } from 'react';
import { cn } from '../../utils/design-system';
import { ModernButton } from './ModernButton';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface ModernControlPanelProps {
  isActive: boolean;
  sessionType: 'work' | 'shortBreak' | 'longBreak';
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkip: () => void;
  onSettings?: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  layout?: 'horizontal' | 'vertical' | 'circular';
  showLabels?: boolean;
}

export const ModernControlPanel: React.FC<ModernControlPanelProps> = ({
  isActive,
  sessionType,
  onStart,
  onPause,
  onReset,
  onSkip,
  onSettings,
  disabled = false,
  size = 'md',
  layout = 'horizontal',
  showLabels = false
}) => {
  const [rippleActive, setRippleActive] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Haptic feedback simulation
  const triggerHapticFeedback = (action: string) => {
    setRippleActive(action);
    setTimeout(() => setRippleActive(null), 300);
    
    // Play subtle click sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Ignore audio play errors
      });
    }
  };

  const getSessionColors = () => {
    switch (sessionType) {
      case 'work':
        return {
          primary: 'from-blue-500 to-blue-600',
          secondary: 'from-blue-400 to-blue-500',
          accent: 'bg-blue-50 dark:bg-blue-950/20'
        };
      case 'shortBreak':
        return {
          primary: 'from-green-500 to-green-600',
          secondary: 'from-green-400 to-green-500',
          accent: 'bg-green-50 dark:bg-green-950/20'
        };
      case 'longBreak':
        return {
          primary: 'from-purple-500 to-purple-600',
          secondary: 'from-purple-400 to-purple-500',
          accent: 'bg-purple-50 dark:bg-purple-950/20'
        };
      default:
        return {
          primary: 'from-slate-500 to-slate-600',
          secondary: 'from-slate-400 to-slate-500',
          accent: 'bg-slate-50 dark:bg-slate-950/20'
        };
    }
  };

  const getSizeConfig = () => {
    switch (size) {
      case 'sm':
        return {
          main: 'w-12 h-12',
          secondary: 'w-10 h-10',
          gap: 'gap-3',
          iconSize: 'w-4 h-4',
          mainIconSize: 'w-5 h-5'
        };
      case 'lg':
        return {
          main: 'w-20 h-20',
          secondary: 'w-16 h-16',
          gap: 'gap-8',
          iconSize: 'w-6 h-6',
          mainIconSize: 'w-8 h-8'
        };
      default: // md
        return {
          main: 'w-16 h-16',
          secondary: 'w-12 h-12',
          gap: 'gap-6',
          iconSize: 'w-5 h-5',
          mainIconSize: 'w-6 h-6'
        };
    }
  };

  const colors = getSessionColors();
  const sizeConfig = getSizeConfig();

  const handleMainAction = () => {
    triggerHapticFeedback('main');
    if (isActive) {
      onPause();
    } else {
      onStart();
    }
  };

  const handleReset = () => {
    triggerHapticFeedback('reset');
    onReset();
  };

  const handleSkip = () => {
    triggerHapticFeedback('skip');
    onSkip();
  };

  const handleSettings = () => {
    triggerHapticFeedback('settings');
    onSettings?.();
  };

  const getLayoutStyles = () => {
    switch (layout) {
      case 'vertical':
        return 'flex flex-col items-center';
      case 'circular':
        return 'grid grid-cols-3 place-items-center';
      default:
        return 'flex items-center justify-center';
    }
  };

  const ControlButton = ({ 
    onClick, 
    icon, 
    label, 
    variant = 'secondary',
    className: buttonClassName,
    ariaLabel 
  }: {
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
    variant?: 'primary' | 'secondary' | 'ghost';
    className?: string;
    ariaLabel: string;
  }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="relative">
          <ModernButton
            variant={variant}
            onClick={onClick}
            disabled={disabled}
            className={cn(
              sizeConfig.secondary,
              'rounded-full p-0 shadow-lg hover:shadow-xl',
              'transform transition-all duration-200 hover:scale-110 active:scale-95',
              'focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-2',
              rippleActive === label && 'animate-pulse',
              buttonClassName
            )}
            aria-label={ariaLabel}
          >
            <span className={sizeConfig.iconSize}>
              {icon}
            </span>
          </ModernButton>
          
          {/* Ripple effect */}
          {rippleActive === label && (
            <div className="absolute inset-0 rounded-full bg-white/30 animate-ping" />
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );

  return (
    <div className={cn(
      getLayoutStyles(),
      sizeConfig.gap,
      'relative',
      className
    )}>
      {/* Hidden audio element for click feedback */}
      <audio
        ref={audioRef}
        preload="auto"
        className="hidden"
      >
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT" type="audio/wav" />
      </audio>

      {/* Reset Button */}
      {layout !== 'circular' && (
        <ControlButton
          onClick={handleReset}
          icon={<span>🔄</span>}
          label="Reset"
          ariaLabel="Reset timer to initial duration"
        />
      )}

      {/* Main Play/Pause Button */}
      <div className="relative">
        <ModernButton
          variant="gradient"
          onClick={handleMainAction}
          disabled={disabled}
          className={cn(
            sizeConfig.main,
            'rounded-full p-0 shadow-2xl hover:shadow-3xl',
            'transform transition-all duration-300 hover:scale-110 active:scale-95',
            'focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:ring-offset-4',
            `bg-gradient-to-br ${colors.primary}`,
            'relative overflow-hidden',
            rippleActive === 'main' && 'animate-pulse'
          )}
          aria-label={isActive ? 'Pause timer' : 'Start timer'}
        >
          <span className={cn(
            sizeConfig.mainIconSize,
            'transition-transform duration-200',
            isActive && 'scale-110'
          )}>
            {isActive ? '⏸️' : '▶️'}
          </span>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </ModernButton>

        {/* Active indicator ring */}
        {isActive && (
          <div className={cn(
            'absolute inset-0 rounded-full border-4 animate-spin',
            sessionType === 'work' ? 'border-blue-500/30' :
            sessionType === 'shortBreak' ? 'border-green-500/30' :
            'border-purple-500/30',
            'border-t-transparent'
          )} />
        )}

        {/* Ripple effect */}
        {rippleActive === 'main' && (
          <div className="absolute inset-0 rounded-full bg-white/30 animate-ping" />
        )}
      </div>

      {/* Skip Button */}
      {layout !== 'circular' && (
        <ControlButton
          onClick={handleSkip}
          icon={<span>⏭️</span>}
          label="Skip"
          ariaLabel="Skip to next session"
        />
      )}

      {/* Circular Layout Additional Controls */}
      {layout === 'circular' && (
        <>
          <ControlButton
            onClick={handleReset}
            icon={<span>🔄</span>}
            label="Reset"
            ariaLabel="Reset timer"
            className="col-start-1 row-start-2"
          />
          
          <ControlButton
            onClick={handleSkip}
            icon={<span>⏭️</span>}
            label="Skip"
            ariaLabel="Skip session"
            className="col-start-3 row-start-2"
          />
          
          {onSettings && (
            <ControlButton
              onClick={handleSettings}
              icon={<span>⚙️</span>}
              label="Settings"
              variant="ghost"
              ariaLabel="Open settings"
              className="col-start-2 row-start-3"
            />
          )}
        </>
      )}

      {/* Labels for horizontal layout */}
      {showLabels && layout === 'horizontal' && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-6 text-xs text-slate-500 dark:text-slate-400">
          <span>Reset</span>
          <span className="font-semibold">{isActive ? 'Pause' : 'Start'}</span>
          <span>Skip</span>
        </div>
      )}
    </div>
  );
};

export default ModernControlPanel;