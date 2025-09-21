import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { designTokens } from '../../utils/design-system';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'filled' | 'outlined';
  elevation?: 1 | 2 | 3 | 4 | 5 | 6;
  interactive?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'elevated', elevation = 1, interactive = false, children, ...props }, ref) => {
    const baseStyles = [
      'rounded-xl',
      'transition-all',
      'duration-200',
      'ease-out',
    ];

    const variantStyles = {
      elevated: [
        'bg-white',
        'dark:bg-gray-900',
        'text-gray-900',
        'dark:text-gray-100',
        `shadow-${elevation}`,
        interactive && 'hover:shadow-4 hover:-translate-y-0.5',
      ],
      filled: [
        'bg-gray-50',
        'dark:bg-gray-800',
        'text-gray-900',
        'dark:text-gray-100',
        interactive && 'hover:bg-gray-100 dark:hover:bg-gray-700',
      ],
      outlined: [
        'bg-transparent',
        'border',
        'border-gray-200',
        'dark:border-gray-700',
        'text-gray-900',
        'dark:text-gray-100',
        interactive && 'hover:bg-gray-50 dark:hover:bg-gray-800/50',
      ],
    };

    const interactiveStyles = interactive ? [
      'cursor-pointer',
      'select-none',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-blue-500',
      'focus:ring-offset-2',
      'dark:focus:ring-offset-gray-900',
    ] : [];

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          interactiveStyles,
          className
        )}
        style={{
          '--card-elevation': designTokens.shadows[elevation as keyof typeof designTokens.shadows],
        } as React.CSSProperties}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  )
);

CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'fs-title-large',
        'font-medium',
        'leading-none',
        'tracking-tight',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
);

CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('fs-body-medium text-gray-600 dark:text-gray-400', className)}
      {...props}
    />
  )
);

CardDescription.displayName = 'CardDescription';

const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);

CardContent.displayName = 'CardContent';

const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  )
);

CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };