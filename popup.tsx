import React from 'react';
import ReactDOM from 'react-dom/client';
import PopupView from './components/PopupView';
import SmilePopup from './components/SmilePopup';
import { TimerProvider } from './hooks/useTimer';
import { QuotesProvider } from './hooks/useQuotes';
import { ToastProvider } from './hooks/useToast';
import { ApiKeyProvider } from './hooks/useApiKey';
import { AppSettingsProvider } from './hooks/useAppSettings';
import { initializeDesignSystem } from './utils/design-system';

// Initialize design system on app load
initializeDesignSystem();

const PopupApp = () => (
    <AppSettingsProvider>
      <ToastProvider>
        <ApiKeyProvider>
          <TimerProvider>
            <QuotesProvider>
              <PopupView />
              <SmilePopup />
            </QuotesProvider>
          </TimerProvider>
        </ApiKeyProvider>
      </ToastProvider>
    </AppSettingsProvider>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PopupApp />
  </React.StrictMode>,
);
