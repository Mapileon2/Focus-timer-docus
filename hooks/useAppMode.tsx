import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type AppMode = 'popup' | 'fullapp';

interface AppModeContextType {
  mode: AppMode;
  isPopup: boolean;
  isFullApp: boolean;
}

const AppModeContext = createContext<AppModeContextType | undefined>(undefined);

export const AppModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<AppMode>('popup');

  useEffect(() => {
    // Detect if we're in popup or full app mode
    const detectMode = () => {
      // Check if we're in a Chrome extension popup
      if (window.location.pathname.includes('fullapp.html')) {
        setMode('fullapp');
      } else if (window.outerWidth <= 400 && window.outerHeight <= 600) {
        // Popup dimensions are typically constrained
        setMode('popup');
      } else {
        // Default to popup for extension context
        setMode('popup');
      }
    };

    detectMode();
    
    // Listen for resize events to detect mode changes
    window.addEventListener('resize', detectMode);
    return () => window.removeEventListener('resize', detectMode);
  }, []);

  const value = {
    mode,
    isPopup: mode === 'popup',
    isFullApp: mode === 'fullapp'
  };

  return (
    <AppModeContext.Provider value={value}>
      {children}
    </AppModeContext.Provider>
  );
};

export const useAppMode = () => {
  const context = useContext(AppModeContext);
  if (context === undefined) {
    throw new Error('useAppMode must be used within an AppModeProvider');
  }
  return context;
};