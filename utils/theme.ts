export type Theme = 'light' | 'dark' | 'auto';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
}

export const themeColors: Record<Theme, ThemeColors> = {
  light: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#1e293b',
    textSecondary: '#64748b',
    border: '#e2e8f0',
    accent: '#06b6d4',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  },
  dark: {
    primary: '#60a5fa',
    secondary: '#a78bfa',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
    border: '#334155',
    accent: '#22d3ee',
    success: '#34d399',
    warning: '#fbbf24',
    error: '#f87171'
  },
  auto: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#1e293b',
    textSecondary: '#64748b',
    border: '#e2e8f0',
    accent: '#06b6d4',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  }
};

export const getSystemTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const getCurrentTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem('theme') as Theme;
  return stored || 'auto';
};

export const setTheme = (theme: Theme): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('theme', theme);
  applyTheme(theme);
};

export const applyTheme = (theme: Theme): void => {
  const effectiveTheme = theme === 'auto' ? getSystemTheme() : theme;
  const colors = themeColors[effectiveTheme];
  
  // Apply CSS custom properties
  const root = document.documentElement;
  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });
  
  // Apply theme class
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(effectiveTheme);
  
  // Update meta theme-color
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', colors.background);
  }
};

export const initializeTheme = (): void => {
  const theme = getCurrentTheme();
  applyTheme(theme);
  
  // Listen for system theme changes
  if (typeof window !== 'undefined') {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (getCurrentTheme() === 'auto') {
        applyTheme('auto');
      }
    });
  }
};

export const getGradientColors = (theme: Theme): string[] => {
  const colors = themeColors[theme];
  return [
    colors.primary,
    colors.secondary,
    colors.accent
  ];
};

export const getSessionColors = (sessionType: string, theme: Theme): { primary: string; secondary: string } => {
  const colors = themeColors[theme];
  
  switch (sessionType) {
    case 'work':
      return { primary: colors.primary, secondary: colors.accent };
    case 'shortBreak':
      return { primary: colors.success, secondary: colors.warning };
    case 'longBreak':
      return { primary: colors.secondary, secondary: colors.accent };
    default:
      return { primary: colors.primary, secondary: colors.secondary };
  }
};