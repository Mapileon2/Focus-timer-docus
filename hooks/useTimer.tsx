import React, { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { TimerState, TimerSettings } from '../types';

// Define a single, consolidated state object for the timer UI
interface AppState {
  timerState: TimerState;
  settings: TimerSettings;
  isActive: boolean;
  completedWorkSessionsToday: number;
}

// Define the shape of the context, including control functions
interface TimerContextType extends AppState {
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  skipSession: () => void;
  updateSettings: (newSettings: Partial<TimerSettings>) => void;
  showSmilePopup: boolean;
  confirmSmileAndProceed: () => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

// Provide a default state for initialization
const defaultState: AppState = {
  isActive: false,
  completedWorkSessionsToday: 0,
  settings: {
    durations: { work: 25 * 60, shortBreak: 5 * 60, longBreak: 15 * 60 },
    soundUrl: 'default_sound.mp3',
  },
  timerState: {
    remainingSec: 25 * 60,
    sessionType: 'work',
    sessionCount: 0,
  },
};

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [appState, setAppState] = useState<AppState>(defaultState);
  const [showSmilePopup, setShowSmilePopup] = useState(false);
  const [lastKnownSessionType, setLastKnownSessionType] = useState<string>('work');

  useEffect(() => {
    const messageListener = (message: any) => {
      if (message.type === 'TIMER_STATE_UPDATE') {
        const newState: AppState = message.payload;

        // Logic to trigger the smile popup
        // A work session has just ended if the previous session was 'work' and the new one is a break.
        if (lastKnownSessionType === 'work' && (newState.timerState.sessionType === 'shortBreak' || newState.timerState.sessionType === 'longBreak')) {
            setShowSmilePopup(true);
        }
        setLastKnownSessionType(newState.timerState.sessionType);

        setAppState(newState);
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);
    chrome.runtime.sendMessage({ type: 'GET_TIMER_STATE' });

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, [lastKnownSessionType]); // Dependency ensures we have the latest session type for comparison

  // Functions to send commands to the background script
  const startTimer = () => chrome.runtime.sendMessage({ type: 'START_TIMER' });
  const pauseTimer = () => chrome.runtime.sendMessage({ type: 'PAUSE_TIMER' });
  const resetTimer = () => chrome.runtime.sendMessage({ type: 'RESET_TIMER' });
  const skipSession = () => {
    if (window.confirm('Are you sure you want to skip to the next session?')) {
      chrome.runtime.sendMessage({ type: 'SKIP_SESSION' });
    }
  };
  const updateSettings = (newSettings: Partial<TimerSettings>) => {
    chrome.runtime.sendMessage({ type: 'UPDATE_SETTINGS', payload: newSettings });
  };
  
  // UI-only logic for the smile popup
  const confirmSmileAndProceed = () => {
    setShowSmilePopup(false);
  };

  const value: TimerContextType = {
    ...appState,
    startTimer,
    pauseTimer,
    resetTimer,
    skipSession,
    updateSettings,
    showSmilePopup,
    confirmSmileAndProceed,
  };

  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};