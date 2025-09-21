import React, { useState, useEffect } from 'react';
import { cn } from '../../utils/design-system';
import { useSpring, animated } from '@react-spring/web';
import { useTheme } from '@/hooks/useTheme';

interface ModernProgressRingProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  showPercentage?: boolean;
  children?: React.ReactNode;
  className?: string;
  enableAnimation?: boolean;
  gradient?: boolean;
}

export const ModernProgressRing: React.FC<ModernProgressRingProps> = ({
  progress,
  size = 120,
  strokeWidth = 8,
  color = '#4285F4',
  backgroundColor = '#E5E7EB',
  showPercentage = false,
  children,
  className,
  enableAnimation = true,
  gradient = false
}) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const [pulseActive, setPulseActive] = useState(false);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;

  // Pulse effect when progress reaches 90%
  useEffect(() => {
    if (progress >= 90) {
      setPulseActive(true);
    } else {
      setPulseActive(false);
    }
  }, [progress]);

  // Spring animation for smooth progress transitions
  const springProps = useSpring({
    strokeDashoffset: strokeDashoffset,
    progress: progress,
    config: { tension: 120, friction: 20, clamp: true },
    immediate: !enableAnimation
  });

  // Pulse animation
  const pulseProps = useSpring({
    scale: pulseActive ? [1, 1.05, 1] : 1,
    config: { tension: 200, friction: 15 },
    loop: pulseActive ? true : false
  });

  return (
    <animated.div 
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{
        ...pulseProps,
        filter: pulseActive ? 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))' : undefined
      } as any}
    >
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Dynamic gradient based on progress and theme */}
        {gradient && (
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isDark ? '#60A5FA' : '#3B82F6'} />
              <stop offset="25%" stopColor={isDark ? '#A78BFA' : '#8B5CF6'} />
              <stop offset="50%" stopColor={isDark ? '#F472B6' : '#EC4899'} />
              <stop offset="75%" stopColor={isDark ? '#FBBF24' : '#F59E0B'} />
              <stop offset="100%" stopColor={isDark ? '#34D399' : '#10B981'} />
            </linearGradient>
          </defs>
        )}

        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          className="opacity-20"
        />

        {/* Progress circle */}
        <animated.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={gradient ? `url(#${gradientId})` : color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={springProps.strokeDashoffset}
          className={cn(
            'drop-shadow-sm transition-all duration-300',
            enableAnimation && 'ease-out'
          )}
          style={{
            filter: `drop-shadow(0 0 6px ${color}40)`
          }}
        />

        {/* Glow effect */}
        <animated.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth / 2}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={springProps.strokeDashoffset}
          className={cn(
            'opacity-30 blur-sm transition-all duration-300',
            enableAnimation && 'ease-out'
          )}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children || (showPercentage && (
          <animated.span 
            className="text-2xl font-bold text-slate-700 dark:text-slate-300"
            style={{
              opacity: springProps.progress.to(p => Math.min(p / 100, 1)),
              transform: springProps.progress.to(p => `scale(${0.9 + (p / 1000)})`)
            }}
          >
            {Math.round(progress)}%
          </animated.span>
        ))}
      </div>
    </animated.div>
  );
};

export default ModernProgressRing;