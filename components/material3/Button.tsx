import React, { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { designTokens, createTransition } from '../../utils/design-system';

const buttonVariants = cva(
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'whitespace-nowrap',
    'rounded-full',
    'font-medium',
    'transition-all',
    'duration-200',
    'ease-out',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-offset-2',
    'disabled:pointer-events-none',
    'disabled:opacity-50',
    'select-none',
  ],
  {
    variants: {
      variant: {
        filled: [
          'bg-blue-600',
          'text-white',
          'shadow-2',
          'hover:bg-blue-700',
          'hover:shadow-3',
          'active:bg-blue-800',
          'focus-visible:ring-blue-500',
        ],
        'filled-tonal': [
          'bg-blue-100',
          'text-blue-900',
          'hover:bg-blue-200',
          'active:bg-blue-300',
          'dark:bg-blue-900',
          'dark:text-blue-100',
          'dark:hover:bg-blue-800',
          'dark:active:bg-blue-700',
          'focus-visible:ring-blue-500',
        ],
        outlined: [
          'border',
          'border-gray-300',
          'bg-transparent',
          'text-gray-700',
          'hover:bg-gray-50',
          'active:bg-gray-100',
          'dark:border-gray-600',
          'dark:text-gray-300',
          'dark:hover:bg-gray-800',
          'dark:active:bg-gray-700',
          'focus-visible:ring-gray-500',
        ],
        text: [
          'bg-transparent',
          'text-blue-600',
          'hover:bg-blue-50',
          'active:bg-blue-100',
          'dark:text-blue-400',
          'dark:hover:bg-blue-950',
          'dark:active:bg-blue-900',
          'focus-visible:ring-blue-500',
        ],
        elevated: [
          'bg-white',
          'text-blue-600',
          'shadow-2',
          'hover:shadow-3',
          'hover:bg-gray-50',
          'active:bg-gray-100',
          'dark:bg-gray-800',
          'dark:text-blue-400',
          'dark:hover:bg-gray-700',
          'dark:active:bg-gray-600',
          'focus-visible:ring-blue-500',
        ],
        fab: [
          'bg-blue-600',
          'text-white',
          'shadow-3',
          'hover:bg-blue-700',
          'hover:shadow-4',
          'active:bg-blue-800',
          'focus-visible:ring-blue-500',
          'rounded-2xl',
        ],
        'fab-extended': [
          'bg-blue-600',
          'text-white',
          'shadow-3',
          'hover:bg-blue-700',
          'hover:shadow-4',
          'active:bg-blue-800',
          'focus-visible:ring-blue-500',
          'rounded-2xl',
          'px-6',
        ],
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-sm',
        lg: 'h-12 px-8 text-base',
        icon: 'h-11 w-11',
        'fab-sm': 'h-14 w-14',
        'fab-md': 'h-16 w-16',
        'fab-lg': 'h-20 w-20',
      },
      color: {
        primary: '',
        secondary: '',
        tertiary: '',
        error: '',
        success: '',
        warning: '',
      },
    },
    compoundVariants: [
      // Primary color variants
      {
        variant: 'filled',
        color: 'primary',
        class: 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800',
      },
      {
        variant: 'filled',
        color: 'secondary',
        class: 'bg-green-600 hover:bg-green-700 active:bg-green-800',
      },
      {
        variant: 'filled',
        color: 'tertiary',
        class: 'bg-purple-600 hover:bg-purple-700 active:bg-purple-800',
      },
      {
        variant: 'filled',
        color: 'error',
        class: 'bg-red-600 hover:bg-red-700 active:bg-red-800',
      },
      {
        variant: 'filled',
        color: 'success',
        class: 'bg-green-600 hover:bg-green-700 active:bg-green-800',
      },
      {
        variant: 'filled',
        color: 'warning',
        class: 'bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800',
      },
      // FAB color variants
      {
        variant: ['fab', 'fab-extended'],
        color: 'primary',
        class: 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800',
      },
      {
        variant: ['fab', 'fab-extended'],
        color: 'secondary',
        class: 'bg-green-600 hover:bg-green-700 active:bg-green-800',
      },
      {
        variant: ['fab', 'fab-extended'],
        color: 'tertiary',
        class: 'bg-purple-600 hover:bg-purple-700 active:bg-purple-800',
      },
    ],
    defaultVariants: {
      variant: 'filled',
      size: 'md',
      color: 'primary',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      color,
      asChild = false,
      loading = false,
      icon,
      trailingIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const isIconOnly = !children && (icon || loading);
    const actualSize = isIconOnly && size === 'md' ? 'icon' : size;

    return (
      <Comp
        className={cn(buttonVariants({ variant, size: actualSize, color, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && icon && <span className={children ? 'mr-2' : ''}>{icon}</span>}
        {children}
        {trailingIcon && <span className="ml-2">{trailingIcon}</span>}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };