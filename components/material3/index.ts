/**
 * Focus & Smile 3.0 - Material 3 Component Library
 * 
 * This module exports Material 3 compliant components that follow
 * Google's Material Design 3 specifications while maintaining
 * compatibility with our existing shadcn/ui components.
 */

export { Material3Button as Button } from './Button';
export { Material3Card as Card } from './Card';
export { Typography } from './Typography';

// Re-export design system utilities
export {
  getSessionConfig,
  getSessionColors,
  getSessionCSSProperties,
  ThemeManager,
  themeManager,
  TYPOGRAPHY_SCALE,
  ELEVATION_LEVELS,
  SURFACE_TYPES,
  ANIMATIONS,
  SPACING,
  BRAND,
  cn
} from '../../utils/design-system';

// Export types
export type { SessionType, ThemeMode } from '../../utils/design-system';