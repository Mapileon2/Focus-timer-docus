import React from 'react';
import { cn } from '../../utils/design-system';
import { useTheme } from '@/hooks/useTheme';

interface GlassMorphismCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'subtle' | 'prominent';
  blur?: 'sm' | 'md' | 'lg';
  opacity?: number;
  padding?: string;
  borderRadius?: string;
}

export const GlassMorphismCard: React.FC<GlassMorphismCardProps> = ({
  children,
  className = '',
  padding = 'p-6',
  borderRadius = 'rounded-2xl'
}) => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  
  return (
    <div
      className={cn(
        'backdrop-blur-sm border shadow-lg',
        'hover:shadow-xl transition-all duration-300',
        isDark 
            ? 'bg-gray-800/10 border-gray-600/20' 
            : 'bg-white/10 border-white/20',
        padding,
        borderRadius,
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassMorphismCard;