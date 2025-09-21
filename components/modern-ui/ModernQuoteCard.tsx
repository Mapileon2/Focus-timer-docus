import React, { useState } from 'react';
import { Quote } from '../../types';
import { cn } from '../../utils/design-system';
import { ModernCard } from './ModernCard';
import { ModernButton } from './ModernButton';
import { StatusIndicator } from './StatusIndicator';

interface ModernQuoteCardProps {
  quote: Quote;
  onDelete?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  onShare?: (quote: Quote) => void;
  variant?: 'default' | 'glass' | 'minimal';
  showActions?: boolean;
}

export const ModernQuoteCard: React.FC<ModernQuoteCardProps> = ({
  quote,
  onDelete,
  onToggleFavorite,
  onShare,
  variant = 'default',
  showActions = true
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getCategoryColor = (category?: string) => {
    switch (category?.toLowerCase()) {
      case 'motivation':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'productivity':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'mindfulness':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'success':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  return (
    <ModernCard
      variant={variant}
      padding="lg"
      hover={true}
      className={cn(
        'group relative transition-all duration-300',
        'hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/30'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Quote Content */}
      <div className="space-y-4">
        {/* Quote Text */}
        <blockquote className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
          <span className="text-3xl text-slate-400 dark:text-slate-600 font-serif leading-none">"</span>
          {quote.content}
          <span className="text-3xl text-slate-400 dark:text-slate-600 font-serif leading-none">"</span>
        </blockquote>

        {/* Author */}
        {quote.author && (
          <cite className="block text-right text-sm font-semibold text-slate-600 dark:text-slate-400 not-italic">
            — {quote.author}
          </cite>
        )}

        {/* Metadata */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center gap-3">
            {/* Category Badge */}
            {quote.category && (
              <span className={cn(
                'px-3 py-1 rounded-full text-xs font-medium',
                getCategoryColor(quote.category)
              )}>
                {quote.category}
              </span>
            )}
            {/* Favorite Status */}
            {quote.isFavorite && (
              <StatusIndicator
                status="warning"
                size="sm"
                label="Favorite"
                showLabel={false}
              />
            )}
          </div>
          {/* Creation Date */}
          <time className="text-xs text-slate-500 dark:text-slate-400">
            {new Date(quote.createdAt).toLocaleDateString()}
          </time>
        </div>
      </div>

      {/* Action Buttons */}
      {showActions && (
        <div className={cn(
          'absolute top-4 right-4 flex items-center gap-2',
          'opacity-0 group-hover:opacity-100 transition-opacity duration-200',
          isHovered && 'opacity-100'
        )}>
          {/* Favorite Button */}
          {onToggleFavorite && (
            <ModernButton
              variant="ghost"
              size="sm"
              onClick={() => onToggleFavorite(quote.id)}
              icon={
                <span className={cn(
                  'text-lg transition-colors duration-200',
                  quote.isFavorite ? 'text-yellow-500' : 'text-slate-400 hover:text-yellow-500'
                )}>
                  {quote.isFavorite ? '⭐' : '☆'}
                </span>
              }
              className="w-8 h-8 rounded-full p-0"
            />
          )}
          {/* Share Button */}
          {onShare && (
            <ModernButton
              variant="ghost"
              size="sm"
              onClick={() => onShare(quote)}
              icon={<span className="text-lg text-slate-400 hover:text-blue-500">📤</span>}
              className="w-8 h-8 rounded-full p-0"
            />
          )}
          {/* Delete Button */}
          {onDelete && (
            <ModernButton
              variant="ghost"
              size="sm"
              onClick={() => onDelete(quote.id)}
              icon={<span className="text-lg text-slate-400 hover:text-red-500">🗑️</span>}
              className="w-8 h-8 rounded-full p-0"
            />
          )}
        </div>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />
    </ModernCard>
  );
};

export default ModernQuoteCard;