import React from 'react';
import { cn } from '../../utils/design-system';
import { AnimatedCounter } from './AnimatedCounter';
import { ModernProgressRing } from './ModernProgressRing';
import { GlassMorphismCard } from './GlassMorphismCard';

interface StatItem {
  label: string;
  value: number;
  unit?: string;
  icon?: string;
  color?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: number;
}

interface ModernStatsCardProps {
  title: string;
  stats: StatItem[];
  variant?: 'default' | 'glass' | 'gradient';
  layout?: 'grid' | 'list';
  showProgress?: boolean;
  progressValue?: number;
  className?: string;
}

export const ModernStatsCard: React.FC<ModernStatsCardProps> = ({
  title,
  stats,
  variant = 'default',
  layout = 'grid',
  showProgress = false,
  progressValue = 0,
  className
}) => {
  const getTrendIcon = (trend?: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return '📈';
      case 'down':
        return '📉';
      default:
        return '➡️';
    }
  };

  const getTrendColor = (trend?: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return 'text-green-600 dark:text-green-400';
      case 'down':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-slate-600 dark:text-slate-400';
    }
  };

  const CardWrapper = variant === 'glass' ? GlassMorphismCard : 'div';
  const cardProps = variant === 'glass' ? { variant: 'default' as const } : {};

  return (
    <CardWrapper
      {...cardProps}
      className={cn(
        'p-6 rounded-2xl',
        variant === 'default' && 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-lg',
        variant === 'gradient' && 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border border-blue-200/50 dark:border-blue-700/50 shadow-lg',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          {title}
        </h3>
        {showProgress && (
          <ModernProgressRing
            progress={progressValue}
            size={40}
            strokeWidth={4}
            color="#4285F4"
            showPercentage={false}
          />
        )}
      </div>

      {/* Stats Grid/List */}
      <div className={cn(
        layout === 'grid' 
          ? 'grid grid-cols-2 gap-4' 
          : 'space-y-4'
      )}>
        {stats.map((stat, index) => (
          <div
            key={index}
            className={cn(
              'p-4 rounded-xl transition-all duration-200 hover:scale-105',
              'bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50',
              'hover:shadow-md hover:bg-slate-100 dark:hover:bg-slate-800'
            )}
          >
            {/* Stat Header */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                {stat.label}
              </span>
              {stat.icon && (
                <span className="text-lg">{stat.icon}</span>
              )}
            </div>

            {/* Stat Value */}
            <div className="flex items-baseline gap-1">
              <AnimatedCounter
                value={stat.value}
                className={cn(
                  'text-2xl font-bold',
                  stat.color || 'text-slate-900 dark:text-slate-100'
                )}
              />
              {stat.unit && (
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {stat.unit}
                </span>
              )}
            </div>

            {/* Trend */}
            {stat.trend && stat.trendValue !== undefined && (
              <div className={cn(
                'flex items-center gap-1 mt-2 text-xs font-medium',
                getTrendColor(stat.trend)
              )}>
                <span>{getTrendIcon(stat.trend)}</span>
                <AnimatedCounter
                  value={stat.trendValue}
                  suffix="%"
                  className="font-bold"
                />
                <span>vs yesterday</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      {showProgress && (
        <div className="mt-6 pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-medium text-slate-700 dark:text-slate-300">
              Daily Goal Progress
            </span>
            <AnimatedCounter
              value={progressValue}
              suffix="%"
              className="font-bold text-blue-600 dark:text-blue-400"
            />
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${Math.min(progressValue, 100)}%` }}
            />
          </div>
        </div>
      )}
    </CardWrapper>
  );
};

export default ModernStatsCard;