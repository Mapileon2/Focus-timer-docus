import { useState, useEffect } from 'react';
import { Theme, getCurrentTheme, setTheme, applyTheme, initializeTheme, getSystemTheme } from '../utils/theme';

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState<'auto' | 'light' | 'dark'>('auto');
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Initialize theme
    initializeTheme();
    setCurrentTheme(getCurrentTheme());
    setSystemTheme(getSystemTheme());

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleThemeChange = () => {
      setSystemTheme(getSystemTheme());
      if (getCurrentTheme() === 'auto') {
        applyTheme('auto');
      }
    };

    mediaQuery.addEventListener('change', handleThemeChange);

    // Listen for storage changes (theme changes in other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme' && e.newValue) {
        setCurrentTheme(e.newValue as Theme);
        applyTheme(e.newValue as Theme);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    setCurrentTheme(newTheme);
  };

  const getEffectiveTheme = (): 'light' | 'dark' => {
    return currentTheme === 'auto' ? systemTheme : currentTheme;
  };

  return {
    theme: currentTheme,
    effectiveTheme: getEffectiveTheme(),
    systemTheme,
    setTheme: updateTheme,
    isDark: getEffectiveTheme() === 'dark'
  };
};