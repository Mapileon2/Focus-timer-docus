import React from 'react';
import { cn } from '../../utils/design-system';
import { ModernButton } from './ModernButton';
import { StatusIndicator } from './StatusIndicator';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  status?: 'active' | 'inactive' | 'new';
}

interface ModernNavigationProps {
  items: NavigationItem[];
  activeItem: string;
  onItemChange: (itemId: string) => void;
  variant?: 'rail' | 'tabs' | 'pills';
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const ModernNavigation: React.FC<ModernNavigationProps> = ({
  items,
  activeItem,
  onItemChange,
  variant = 'rail',
  orientation = 'vertical',
  className
}) => {
  const isVertical = orientation === 'vertical';

  const getContainerStyles = () => {
    switch (variant) {
      case 'tabs':
        return cn(
          'flex border-b border-slate-200 dark:border-slate-700',
          isVertical ? 'flex-col border-b-0 border-r' : 'flex-row'
        );
      case 'pills':
        return cn(
          'flex gap-2 p-2 bg-slate-100 dark:bg-slate-800 rounded-2xl',
          isVertical ? 'flex-col' : 'flex-row'
        );
      default: // rail
        return cn(
          'flex gap-4 p-4',
          isVertical ? 'flex-col' : 'flex-row'
        );
    }
  };

  const getItemStyles = (item: NavigationItem, isActive: boolean) => {
    const baseStyles = cn(
      'relative flex items-center gap-3 px-4 py-3 rounded-xl',
      'font-medium text-sm transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-blue-500/20'
    );

    switch (variant) {
      case 'tabs':
        return cn(
          baseStyles,
          'rounded-none border-b-2 px-6 py-4',
          isActive
            ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50'
            : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800'
        );
      case 'pills':
        return cn(
          baseStyles,
          isActive
            ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-white/50 dark:hover:bg-slate-700/50'
        );
      default: // rail
        return cn(
          baseStyles,
          isActive
            ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 shadow-sm'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800'
        );
    }
  };

  return (
    <nav className={cn(getContainerStyles(), className)}>
      {items.map((item) => {
        const isActive = activeItem === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onItemChange(item.id)}
            className={getItemStyles(item, isActive)}
            aria-current={isActive ? 'page' : undefined}
          >
            {/* Icon */}
            <span className={cn(
              'flex-shrink-0 text-lg',
              isActive && 'scale-110'
            )}>
              {item.icon}
            </span>

            {/* Label */}
            <span className={cn(
              'flex-1 text-left',
              isVertical ? 'block' : 'hidden sm:block'
            )}>
              {item.label}
            </span>

            {/* Badge */}
            {item.badge && item.badge > 0 && (
              <span className={cn(
                'flex-shrink-0 px-2 py-1 text-xs font-bold rounded-full',
                'bg-red-500 text-white min-w-[1.25rem] h-5 flex items-center justify-center'
              )}>
                {item.badge > 99 ? '99+' : item.badge}
              </span>
            )}

            {/* Status Indicator */}
            {item.status && item.status !== 'inactive' && (
              <div className="flex-shrink-0">
                <StatusIndicator
                  status={item.status === 'new' ? 'warning' : 'active'}
                  size="sm"
                  animated={item.status === 'active'}
                />
              </div>
            )}

            {/* Active indicator for rail variant */}
            {variant === 'rail' && isActive && (
              <div className={cn(
                'absolute bg-blue-500 rounded-full',
                isVertical ? 'left-0 top-1/2 -translate-y-1/2 w-1 h-8' : 'bottom-0 left-1/2 -translate-x-1/2 h-1 w-8'
              )} />
            )}
          </button>
        );
      })}
    </nav>
  );
};

export default ModernNavigation;