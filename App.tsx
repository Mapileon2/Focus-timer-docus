import React, { useEffect } from 'react';
import PopupView from './components/PopupView';
import FullAppView from './components/FullAppView';
import ModernFullAppView from './components/ModernFullAppView';
import SmilePopup from './components/SmilePopup';
import { TimerProvider } from './hooks/useTimer';
import { QuotesProvider } from './hooks/useQuotes';
import { ToastProvider } from './hooks/useToast';
import { ApiKeyProvider } from './hooks/useApiKey';
import { AppSettingsProvider } from './hooks/useAppSettings';
import { AppModeProvider, useAppMode } from './hooks/useAppMode';
import { initializeDesignSystem } from './utils/design-system';

const AppContent = () => {
    const { isPopup, isFullApp } = useAppMode();

    // Initialize design system on app load
    useEffect(() => {
        initializeDesignSystem();
    }, []);

    return (
        <>
            {isPopup && <PopupView />}
            {isFullApp && <ModernFullAppView />}
            <SmilePopup />
        </>
    );
}

const App = () => {
  return (
    <AppModeProvider>
      <AppSettingsProvider>
        <ToastProvider>
          <ApiKeyProvider>
            <TimerProvider>
              <QuotesProvider>
                <AppContent />
              </QuotesProvider>
            </TimerProvider>
          </ApiKeyProvider>
        </ToastProvider>
      </AppSettingsProvider>
    </AppModeProvider>
  );
};

export default App;
