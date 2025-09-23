import React from 'react';
import { cn } from '../../utils/design-system';
import { AnimatedCounter } from './AnimatedCounter';
import { ModernProgressRing } from './ModernProgressRing';
import { GlassMorphismCard } from './GlassMorphismCard';
import { Badge } from '../ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface StatItem {
  label: string;
  value: number;
  unit?: string;
  icon?: string;
  color?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: number;
  target?: number;
  description?: string;
}

interface ModernStatsCardProps {
  title: string;
  stats: StatItem[];
  variant?: 'default' | 'glass' | 'gradient';
  layout?: 'grid' | 'list';
  showProgress?: boolean;
  progressValue?: number;
  className?: string;
  interactive?: boolean;
  onStatClick?: (stat: StatItem) => void;
}

export const ModernStatsCard: React.FC<ModernStatsCardProps> = ({
  title,
  stats,
  variant = 'default',
  layout = 'grid',
  showProgress = false,
  progressValue = 0,
  className,
  interactive = false,
  onStatClick
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

  const getProgressColor = (value: number, target?: number) => {
    if (!target) return 'from-blue-500 to-purple-500';
    
    const percentage = (value / target) * 100;
    if (percentage >= 100) return 'from-green-500 to-emerald-500';
    if (percentage >= 75) return 'from-blue-500 to-cyan-500';
    if (percentage >= 50) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const CardWrapper = variant === 'glass' ? GlassMorphismCard : 'div';
  const cardProps = variant === 'glass' ? { variant: 'default' as const } : {};

  return (
    <CardWrapper
      {...cardProps}
      className={cn(
        'p-6 rounded-2xl',
        variant === 'default' && 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-lg',
        variant === 'gradient' && 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20 border border-blue-200/50 dark:border-blue-700/50 shadow-lg',
        interactive && 'hover:shadow-xl hover:scale-105 cursor-pointer transition-all duration-300',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200/50 dark:border-slate-700/50">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
          {title}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Updated {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        
        {showProgress && (
          <Tooltip>
            <TooltipTrigger>
              <ModernProgressRing
                progress={progressValue}
                size={48}
                strokeWidth={4}
                color="#4285F4"
                gradient={true}
                animated={true}
              >
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {Math.round(progressValue)}%
                </span>
              </ModernProgressRing>
            </TooltipTrigger>
            <TooltipContent>
              <p>Daily Goal Progress: {Math.round(progressValue)}%</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>

      {/* Stats Grid/List */}
      <div className={cn(
        layout === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' 
          : 'space-y-4'
      )}>
        {stats.map((stat, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <div
            key={index}
            className={cn(
              'p-4 rounded-xl transition-all duration-300 group',
              'bg-gradient-to-br from-white to-slate-50 dark:from-slate-800/50 dark:to-slate-900/50',
              'border border-slate-200/50 dark:border-slate-700/50',
              'hover:shadow-lg hover:scale-105 hover:bg-gradient-to-br hover:from-white hover:to-blue-50 dark:hover:to-blue-950/20',
              interactive && 'cursor-pointer'
            )}
            onClick={() => interactive && onStatClick?.(stat)}
          >
            {/* Stat Header */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                {stat.label}
              </span>
              {stat.icon && (
                <span className="text-lg transition-transform duration-200 group-hover:scale-110">
                  {stat.icon}
                </span>
              )}
            </div>

            {/* Stat Value */}
            <div className="flex items-baseline gap-1 mb-2">
              <AnimatedCounter
                value={stat.value}
                className={cn(
                  'text-2xl font-bold transition-colors duration-200',
                  stat.color || 'text-slate-900 dark:text-slate-100'
                )}
                duration={800}
              />
              {stat.unit && (
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                  {stat.unit}
                </span>
              )}
            </div>

            {/* Target Progress */}
            {stat.target && (
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-500 dark:text-slate-400">Target: {stat.target}{stat.unit}</span>
                  <span className="font-bold text-slate-600 dark:text-slate-300">
                    {Math.round((stat.value / stat.target) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                  <div
                    className={cn(
                      'h-1.5 rounded-full transition-all duration-1000 ease-out',
                      `bg-gradient-to-r ${getProgressColor(stat.value, stat.target)}`
                    )}
                    style={{ width: `${Math.min((stat.value / stat.target) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Trend */}
            {stat.trend && stat.trendValue !== undefined && (
              <div className={cn(
                'flex items-center gap-1 text-xs font-medium',
                getTrendColor(stat.trend)
              )}>
                <span>{getTrendIcon(stat.trend)}</span>
                <AnimatedCounter
                  value={stat.trendValue}
                  suffix="%"
                  className="font-bold"
                  duration={600}
                />
                <span>vs last period</span>
              </div>
            )}
          </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1">
                <p className="font-semibold">{stat.label}</p>
                {stat.description && (
                  <p className="text-xs">{stat.description}</p>
                )}
                {stat.target && (
                  <p className="text-xs">Target: {stat.target}{stat.unit}</p>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      {/* Progress Bar */}
      {showProgress && (
        <div className="mt-6 pt-6 border-t border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center justify-between text-sm mb-3">
            <span className="font-medium text-slate-700 dark:text-slate-300">
              Daily Goal Progress
            </span>
            <div className="flex items-center gap-2">
              <AnimatedCounter
                value={progressValue}
                suffix="%"
                className="font-bold text-blue-600 dark:text-blue-400"
                duration={1000}
              />
              <Badge variant={progressValue >= 100 ? 'success' : progressValue >= 75 ? 'default' : 'secondary'} className="text-xs">
                {progressValue >= 100 ? '🎉 Complete!' :
                 progressValue >= 75 ? '🔥 Almost there!' :
                 progressValue >= 50 ? '💪 Good progress' :
                 '🚀 Getting started'}
              </Badge>
            </div>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
            <div
              className={cn(
                'h-3 rounded-full transition-all duration-1000 ease-out relative overflow-hidden',
                `bg-gradient-to-r ${getProgressColor(progressValue, 100)}`
              )}
              style={{ width: `${Math.min(progressValue, 100)}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
            </div>
          </div>
          
          {/* Progress milestones */}
          <div className="flex justify-between mt-2 text-xs text-slate-500 dark:text-slate-400">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>
      )}
    </CardWrapper>
  );
};

export default ModernStatsCard;