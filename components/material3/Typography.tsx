import React from 'react';
import { cn } from '../../utils/design-system';

type TypographyVariant = 
  | 'display-large' | 'display-medium' | 'display-small'
  | 'headline-large' | 'headline-medium' | 'headline-small'
  | 'title-large' | 'title-medium' | 'title-small'
  | 'body-large' | 'body-medium' | 'body-small'
  | 'label-large' | 'label-medium' | 'label-small';

type TypographyElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';

interface TypographyProps {
  /**
   * Material 3 typography variant
   */
  variant: TypographyVariant;
  
  /**
   * HTML element to render
   */
  as?: TypographyElement;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Text color variant
   */
  color?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'surface' | 'outline';
  
  /**
   * Whether to apply gradient text effect
   */
  gradient?: boolean;
  
  /**
   * Content
   */
  children: React.ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({
  variant,
  as,
  className,
  color,
  gradient = false,
  children,
  ...props
}) => {
  // Default element mapping for semantic HTML
  const getDefaultElement = (): TypographyElement => {
    if (as) return as;
    
    switch (variant) {
      case 'display-large':
      case 'display-medium':
      case 'display-small':
        return 'h1';
      case 'headline-large':
        return 'h2';
      case 'headline-medium':
        return 'h3';
      case 'headline-small':
        return 'h4';
      case 'title-large':
        return 'h5';
      case 'title-medium':
      case 'title-small':
        return 'h6';
      case 'body-large':
      case 'body-medium':
      case 'body-small':
        return 'p';
      case 'label-large':
      case 'label-medium':
      case 'label-small':
        return 'span';
      default:
        return 'p';
    }
  };

  const getVariantClass = () => {
    return `fs-${variant}`;
  };

  const getColorClass = () => {
    if (gradient) {
      return 'fs-gradient-text';
    }
    
    switch (color) {
      case 'primary':
        return 'text-[var(--md-sys-color-primary)]';
      case 'secondary':
        return 'text-[var(--md-sys-color-secondary)]';
      case 'tertiary':
        return 'text-[var(--md-sys-color-tertiary)]';
      case 'error':
        return 'text-[var(--md-sys-color-error)]';
      case 'surface':
        return 'text-[var(--md-sys-color-on-surface)]';
      case 'outline':
        return 'text-[var(--md-sys-color-outline)]';
      default:
        return 'text-[var(--md-sys-color-on-surface)]';
    }
  };

  const Element = getDefaultElement();

  return (
    <Element
      className={cn(
        getVariantClass(),
        getColorClass(),
        className
      )}
      {...props}
    >
      {children}
    </Element>
  );
};

export default Typography;