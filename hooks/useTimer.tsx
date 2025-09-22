import React, { useState, useEffect, useContext, createContext, ReactNode, useCallback } from 'react';
import { TimerState, TimerSettings } from '../types';
import { STORAGE_KEY_TIMER_STATE, DEFAULT_SOUND_URL } from '../constants';

// Declare chrome for TypeScript
declare const chrome: any;

// --- Default values ---
const DEFAULT_DURATIONS = {
  work: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

const DEFAULT_TIMER_STATE: TimerState = {
  remainingSec: DEFAULT_DURATIONS.work,
  sessionType: 'work',
  sessionCount: 0,
};

const DEFAULT_SETTINGS: TimerSettings = {
  durations: DEFAULT_DURATIONS,
  soundUrl: DEFAULT_SOUND_URL,
};

// --- Context Definition ---
interface TimerContextType {
  timerState: TimerState;
  isActive: boolean;
  settings: TimerSettings;
  completedWorkSessionsToday: number;
  showSmilePopup: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  skipSession: () => void;
  updateSettings: (newSettings: Partial<TimerSettings>) => void;
  confirmSmileAndProceed: () => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

// --- Provider Component ---
export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [timerState, setTimerState] = useState<TimerState>(DEFAULT_TIMER_STATE);
  const [isActive, setIsActive] = useState(false);
  const [settings, setSettings] = useState<TimerSettings>(DEFAULT_SETTINGS);
  const [completedWorkSessionsToday, setCompletedWorkSessionsToday] = useState(0);
  const [showSmilePopup, setShowSmilePopup] = useState(false);

  // Load initial state from storage
  useEffect(() => {
    if (chrome && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(STORAGE_KEY_TIMER_STATE, (result: any) => {
        const stored = result[STORAGE_KEY_TIMER_STATE];
        if (stored) {
          setTimerState(stored.timerState || DEFAULT_TIMER_STATE);
          setIsActive(stored.isActive || false);
          setSettings(stored.settings || DEFAULT_SETTINGS);
          setCompletedWorkSessionsToday(stored.completedWorkSessionsToday || 0);
        }
      });
    }
  }, []);

  // Listen for state changes from the background script
  useEffect(() => {
    const handleStorageChange = (changes: any, areaName: string) => {
      if (areaName === 'local' && changes[STORAGE_KEY_TIMER_STATE]) {
        const { newValue } = changes[STORAGE_KEY_TIMER_STATE];
        setTimerState(newValue.timerState);
        setIsActive(newValue.isActive);
        setSettings(newValue.settings);
        setCompletedWorkSessionsToday(newValue.completedWorkSessionsToday);
        setShowSmilePopup(newValue.showSmilePopup || false);
      }
    };

    if (chrome && chrome.storage && chrome.storage.onChanged) {
      chrome.storage.onChanged.addListener(handleStorageChange);
    }

    return () => {
      if (chrome && chrome.storage && chrome.storage.onChanged) {
        chrome.storage.onChanged.removeListener(handleStorageChange);
      }
    };
  }, []);


  // --- Control Functions ---
  const sendMessage = (command: string, data: any = {}) => {
    if (chrome && chrome.runtime) {
      chrome.runtime.sendMessage({ command, ...data });
    }
  };

  const startTimer = () => sendMessage('start');
  const pauseTimer = () => sendMessage('pause');
  const resetTimer = () => sendMessage('reset');
  const skipSession = () => {
    if (window.confirm('Are you sure you want to skip to the next session?')) {
        setShowSmilePopup(false); // Hide popup on skip
        sendMessage('skip');
    }
  };

  const confirmSmileAndProceed = () => {
      // The popup will be hidden by the state update from the background script
      sendMessage('proceed');
  };

  const updateSettings = useCallback((newSettings: Partial<TimerSettings>) => {
    const updatedSettings = {
      ...settings,
      ...newSettings,
      durations: { ...settings.durations, ...newSettings.durations }
    };
    setSettings(updatedSettings);
    sendMessage('updateSettings', { settings: updatedSettings });
  }, [settings]);

  const value = {
    timerState,
    isActive,
    settings,
    completedWorkSessionsToday,
    showSmilePopup,
    startTimer,
    pauseTimer,
    resetTimer,
    skipSession,
    updateSettings,
    confirmSmileAndProceed
  };

  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
};

// --- Custom Hook ---
export const useTimer = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};