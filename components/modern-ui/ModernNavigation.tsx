import React from 'react';
import { cn } from '../../utils/design-system';
import { StatusIndicator } from './StatusIndicator';
import { Badge } from '../ui/badge';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  status?: 'active' | 'inactive' | 'new' | 'warning';
  disabled?: boolean;
}

interface ModernNavigationProps {
  items: NavigationItem[];
  activeItem: string;
  onItemChange: (itemId: string) => void;
  variant?: 'rail' | 'tabs' | 'pills';
  orientation?: 'horizontal' | 'vertical';
  showLabels?: boolean;
  compact?: boolean;
  className?: string;
}

export const ModernNavigation: React.FC<ModernNavigationProps> = ({
  items,
  activeItem,
  onItemChange,
  variant = 'rail',
  orientation = 'vertical',
  showLabels = true,
  compact = false,
  className
}) => {
  const isVertical = orientation === 'vertical';

  const getContainerStyles = () => {
    switch (variant) {
      case 'tabs':
        return cn(
          'flex bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-1 shadow-lg',
          isVertical ? 'flex-col border-b-0 border-r' : 'flex-row'
        );
      case 'pills':
        return cn(
          'flex gap-2 p-3 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50',
          isVertical ? 'flex-col' : 'flex-row'
        );
      default: // rail
        return cn(
          'flex gap-3 p-4 bg-white/30 dark:bg-slate-900/30 backdrop-blur-md rounded-2xl border border-white/20 dark:border-slate-700/20',
          isVertical ? 'flex-col' : 'flex-row'
        );
    }
  };

  const getItemStyles = (item: NavigationItem, isActive: boolean) => {
    const baseStyles = cn(
      'relative flex items-center gap-3 rounded-xl transition-all duration-300 ease-out',
      'font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20',
      'transform hover:scale-105 active:scale-95',
      compact ? 'px-3 py-2' : 'px-4 py-3',
      item.disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
    );

    switch (variant) {
      case 'tabs':
        return cn(
          baseStyles,
          'rounded-xl px-6 py-3 shadow-sm',
          isActive
            ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-lg border border-blue-200 dark:border-blue-700'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-white/50 dark:hover:bg-slate-800/50'
        );
      case 'pills':
        return cn(
          baseStyles,
          isActive
            ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-lg border border-slate-200 dark:border-slate-600'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-white/70 dark:hover:bg-slate-700/70'
        );
      default: // rail
        return cn(
          baseStyles,
          isActive
            ? 'bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 text-blue-600 dark:text-blue-400 shadow-lg border border-blue-200/50 dark:border-blue-700/50'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-white/50 dark:hover:bg-slate-800/50'
        );
    }
  };

  return (
    <nav className={cn(getContainerStyles(), className)} role="navigation" aria-label="Main navigation">
      {items.map((item) => {
        const isActive = activeItem === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onItemChange(item.id)}
            disabled={item.disabled}
            className={getItemStyles(item, isActive)}
            aria-current={isActive ? 'page' : undefined}
            aria-label={`Navigate to ${item.label}`}
          >
            {/* Icon */}
            <span className={cn(
              'flex-shrink-0 text-lg transition-transform duration-200',
              isActive && 'scale-110 drop-shadow-sm'
            )}>
              {item.icon}
            </span>

            {/* Label */}
            {showLabels && (
              <span className={cn(
                'flex-1 text-left transition-all duration-200',
                isVertical ? 'block' : 'hidden sm:block',
                compact && 'text-xs'
              )}>
                {item.label}
              </span>
            )}

            {/* Badge */}
            {item.badge && item.badge > 0 && (
              <Badge variant="destructive" className="flex-shrink-0 min-w-[1.25rem] h-5 text-xs animate-pulse">
                {item.badge > 99 ? '99+' : item.badge}
              </Badge>
            )}

            {/* Status Indicator */}
            {item.status && item.status !== 'inactive' && (
              <div className="flex-shrink-0">
                <StatusIndicator
                  status={item.status === 'new' ? 'warning' : item.status === 'warning' ? 'warning' : 'active'}
                  size="sm"
                  animated={item.status === 'active' || item.status === 'warning'}
                />
              </div>
            )}

            {/* Active indicator for rail variant */}
            {variant === 'rail' && isActive && (
              <div className={cn(
                'absolute bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg',
                isVertical ? 'left-0 top-1/2 -translate-y-1/2 w-1 h-8' : 'bottom-0 left-1/2 -translate-x-1/2 h-1 w-8'
              )} />
            )}

            {/* Ripple effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </button>
        );
      })}
    </nav>
  );
};

export default ModernNavigation;