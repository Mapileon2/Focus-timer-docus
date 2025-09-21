/**
 * Focus & Smile 3.0 Design System Utilities
 * Material 3 Design System Implementation
 */

// Design Tokens
export const designTokens = {
  colors: {
    primary: '#4285F4',
    primaryContainer: '#E3F2FD',
    onPrimary: '#FFFFFF',
    onPrimaryContainer: '#1565C0',
    
    secondary: '#34A853',
    secondaryContainer: '#E8F5E8',
    onSecondary: '#FFFFFF',
    onSecondaryContainer: '#1B5E20',
    
    tertiary: '#7E57C2',
    tertiaryContainer: '#F3E5F5',
    onTertiary: '#FFFFFF',
    onTertiaryContainer: '#4A148C',
    
    background: '#F8F9FA',
    surface: '#FFFFFF',
    surfaceVariant: '#F5F5F5',
    outline: '#E8EAED',
    outlineVariant: '#F0F0F0',
    
    onBackground: '#202124',
    onSurface: '#202124',
    onSurfaceVariant: '#5F6368',
    
    error: '#D93025',
    errorContainer: '#FFEAEA',
    onError: '#FFFFFF',
    onErrorContainer: '#B71C1C',
    
    success: '#137333',
    successContainer: '#E6F4EA',
    onSuccess: '#FFFFFF',
    onSuccessContainer: '#0D5016',
    
    warning: '#F9AB00',
    warningContainer: '#FEF7E0',
    onWarning: '#000000',
    onWarningContainer: '#B8860B',
  },
  
  typography: {
    fontFamilies: {
      display: "'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      body: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    },
    
    sizes: {
      displayLarge: '3.5rem',
      displayMedium: '2.8rem',
      displaySmall: '2.25rem',
      headlineLarge: '2rem',
      headlineMedium: '1.75rem',
      headlineSmall: '1.5rem',
      titleLarge: '1.375rem',
      titleMedium: '1rem',
      titleSmall: '0.875rem',
      bodyLarge: '1rem',
      bodyMedium: '0.875rem',
      bodySmall: '0.75rem',
      labelLarge: '0.875rem',
      labelMedium: '0.75rem',
      labelSmall: '0.6875rem',
    },
    
    weights: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    
    lineHeights: {
      tight: 1.2,
      normal: 1.4,
      relaxed: 1.6,
    },
  },
  
  spacing: {
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
  },
  
  borderRadius: {
    none: '0',
    xs: '0.125rem',
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  
  shadows: {
    1: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    2: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    3: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    4: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    5: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    6: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  },
  
  animation: {
    durations: {
      fast: '150ms',
      normal: '200ms',
      slow: '300ms',
      slower: '500ms',
    },
    
    easings: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  
  logos: {
    popup: '32px',
    fullapp: '40px',
  },
} as const;

// Session Type Color Mapping
export const sessionTypeColors = {
  work: {
    primary: designTokens.colors.primary,
    container: designTokens.colors.primaryContainer,
    onContainer: designTokens.colors.onPrimaryContainer,
    label: 'Focus',
    emoji: '🎯',
  },
  shortBreak: {
    primary: designTokens.colors.secondary,
    container: designTokens.colors.secondaryContainer,
    onContainer: designTokens.colors.onSecondaryContainer,
    label: 'Break',
    emoji: '☕',
  },
  longBreak: {
    primary: designTokens.colors.tertiary,
    container: designTokens.colors.tertiaryContainer,
    onContainer: designTokens.colors.onTertiaryContainer,
    label: 'Rest',
    emoji: '🌟',
  },
} as const;

// Typography Style Generator
export const createTypographyStyle = (
  variant: keyof typeof designTokens.typography.sizes,
  weight?: keyof typeof designTokens.typography.weights,
  lineHeight?: keyof typeof designTokens.typography.lineHeights
) => {
  const isDisplay = variant.startsWith('display') || variant.startsWith('headline') || variant.startsWith('title');
  const fontFamily = isDisplay ? designTokens.typography.fontFamilies.display : designTokens.typography.fontFamilies.body;
  
  return {
    fontFamily,
    fontSize: designTokens.typography.sizes[variant],
    fontWeight: weight ? designTokens.typography.weights[weight] : designTokens.typography.weights.regular,
    lineHeight: lineHeight ? designTokens.typography.lineHeights[lineHeight] : designTokens.typography.lineHeights.normal,
  };
};

// Color Utilities
export const getSessionTypeColor = (sessionType: 'work' | 'shortBreak' | 'longBreak') => {
  return sessionTypeColors[sessionType];
};

export const createColorVariant = (baseColor: string, opacity: number) => {
  // Convert hex to rgba
  const hex = baseColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Spacing Utilities
export const createSpacing = (...values: (keyof typeof designTokens.spacing)[]) => {
  return values.map(value => designTokens.spacing[value]).join(' ');
};

// Animation Utilities
export const createTransition = (
  properties: string[],
  duration: keyof typeof designTokens.animation.durations = 'normal',
  easing: keyof typeof designTokens.animation.easings = 'out'
) => {
  return properties
    .map(prop => `${prop} ${designTokens.animation.durations[duration]} ${designTokens.animation.easings[easing]}`)
    .join(', ');
};

// Elevation Utilities
export const getElevation = (level: keyof typeof designTokens.shadows) => {
  return designTokens.shadows[level];
};

// Logo Size Utilities
export const getLogoSize = (context: 'popup' | 'fullapp') => {
  return designTokens.logos[context];
};

// CSS Custom Properties Generator
export const generateCSSCustomProperties = () => {
  const properties: Record<string, string> = {};
  
  // Colors
  Object.entries(designTokens.colors).forEach(([key, value]) => {
    properties[`--fs-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`] = value;
  });
  
  // Typography
  Object.entries(designTokens.typography.sizes).forEach(([key, value]) => {
    properties[`--fs-text-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`] = value;
  });
  
  // Spacing
  Object.entries(designTokens.spacing).forEach(([key, value]) => {
    properties[`--fs-space-${key}`] = value;
  });
  
  // Shadows
  Object.entries(designTokens.shadows).forEach(([key, value]) => {
    properties[`--fs-shadow-${key}`] = value;
  });
  
  return properties;
};

// Initialize Design System
export const initializeDesignSystem = () => {
  // Apply CSS custom properties to root
  const root = document.documentElement;
  const properties = generateCSSCustomProperties();
  
  Object.entries(properties).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
  
  // Set base font families
  root.style.setProperty('font-family', designTokens.typography.fontFamilies.body);
};

// Theme Management
export const applyTheme = (theme: 'light' | 'dark' | 'auto') => {
  const root = document.documentElement;
  
  if (theme === 'auto') {
    // Remove explicit theme classes and let CSS media queries handle it
    root.classList.remove('light', 'dark');
  } else {
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }
};

// Responsive Utilities
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const createMediaQuery = (breakpoint: keyof typeof breakpoints) => {
  return `@media (min-width: ${breakpoints[breakpoint]})`;
};

// Class Name Utility (cn)
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Session Colors Utility (alias for getSessionTypeColor)
export const getSessionColors = (sessionType: 'work' | 'shortBreak' | 'longBreak') => {
  return getSessionTypeColor(sessionType);
};

// Export all utilities
export default {
  designTokens,
  sessionTypeColors,
  createTypographyStyle,
  getSessionTypeColor,
  getSessionColors,
  createColorVariant,
  createSpacing,
  createTransition,
  getElevation,
  getLogoSize,
  generateCSSCustomProperties,
  initializeDesignSystem,
  applyTheme,
  breakpoints,
  createMediaQuery,
  cn,
};