import React, { useState, useEffect, useContext, createContext, ReactNode, useCallback, useRef, useMemo } from 'react';
import { TimerState, SessionType, TimerSettings } from '../types';
import { STORAGE_KEY_TIMER_STATE, DEFAULT_SOUND_URL } from '../constants';

declare const chrome: any;

interface SessionDurations {
  work: number;
  shortBreak: number;
  longBreak: number;
}

interface TimerContextType {
  timerState: TimerState;
  isActive: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  skipSession: () => void;
  settings: TimerSettings;
  updateSettings: (newSettings: Partial<TimerSettings>) => void;
  completedWorkSessionsToday: number;
  showSmilePopup: boolean;
  confirmSmileAndProceed: () => void;
  triggerSmilePopup: () => void;
  updateTimerSettings: (type: 'work' | 'shortBreak' | 'longBreak', value: number) => void;
  // Enhanced timer features
  totalFocusTimeToday: number;
  currentStreak: number;
  longestStreak: number;
  averageSessionLength: number;
  productivity: number;
  lastSessionEndTime: number | null;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

const DEFAULT_DURATIONS: SessionDurations = {
  work: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

const LONG_BREAK_INTERVAL = 4;

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<TimerSettings>({
    durations: DEFAULT_DURATIONS,
    soundUrl: DEFAULT_SOUND_URL,
  });
  const [timerState, setTimerState] = useState<TimerState>({
    remainingSec: settings.durations.work,
    sessionType: 'work',
    sessionCount: 0,
  });
  const [isActive, setIsActive] = useState(false);
  const [completedWorkSessionsToday, setCompletedWorkSessionsToday] = useState(0);
  const [showSmilePopup, setShowSmilePopup] = useState(false);
  
  // Enhanced analytics state
  const [totalFocusTimeToday, setTotalFocusTimeToday] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [sessionHistory, setSessionHistory] = useState<Array<{
    type: SessionType;
    duration: number;
    completed: boolean;
    timestamp: number;
  }>>([]);
  const [lastSessionEndTime, setLastSessionEndTime] = useState<number | null>(null);

  // High-precision timer refs
  const startTimeRef = useRef<number | null>(null);
  const expectedEndTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastTickRef = useRef<number>(0);

  // Calculate derived analytics
  const averageSessionLength = useMemo(() => {
    const completedSessions = sessionHistory.filter(s => s.completed && s.type === 'work');
    if (completedSessions.length === 0) return 0;
    return completedSessions.reduce((sum, s) => sum + s.duration, 0) / completedSessions.length;
  }, [sessionHistory]);

  const productivity = useMemo(() => {
    const today = new Date().toDateString();
    const todaySessions = sessionHistory.filter(s => 
      new Date(s.timestamp).toDateString() === today && s.completed && s.type === 'work'
    );
    
    if (todaySessions.length === 0) return 0;
    
    const completedTime = todaySessions.reduce((sum, s) => sum + s.duration, 0);
    const plannedTime = todaySessions.length * settings.durations.work;
    
    return Math.round((completedTime / plannedTime) * 100);
  }, [sessionHistory, settings.durations.work]);

  // High-precision timer tick function
  const tick = useCallback(() => {
    if (!startTimeRef.current) return;

    const now = performance.now();
    const elapsed = now - startTimeRef.current;
    const remaining = Math.max(0, expectedEndTimeRef.current - now);
    const remainingSeconds = Math.ceil(remaining / 1000);

    // Only update if the second has changed
    if (remainingSeconds !== lastTickRef.current) {
      lastTickRef.current = remainingSeconds;
      setTimerState(prev => ({ ...prev, remainingSec: remainingSeconds }));
    }

    if (remaining <= 0) {
      // Timer completed
      startTimeRef.current = null;
      setIsActive(false);
      
      // Record completed session
      const sessionDuration = settings.durations[timerState.sessionType];
      setSessionHistory(prev => [...prev, {
        type: timerState.sessionType,
        duration: sessionDuration,
        completed: true,
        timestamp: Date.now()
      }]);
      
      setLastSessionEndTime(Date.now());
      
      // Update analytics
      if (timerState.sessionType === 'work') {
        setTotalFocusTimeToday(prev => prev + sessionDuration);
        setCurrentStreak(prev => prev + 1);
        setLongestStreak(prev => Math.max(prev, currentStreak + 1));
      }
      
      playSound();
      
      if (timerState.sessionType === 'work') {
        setShowSmilePopup(true);
      } else {
        startNextSession();
      }
    } else {
      // Schedule next tick
      animationFrameRef.current = requestAnimationFrame(tick);
    }
  }, [timerState.sessionType, settings.durations, currentStreak]);

  const playSound = useCallback(() => {
    if (settings.soundUrl) {
      if (audioRef.current) {
        audioRef.current.src = settings.soundUrl;
        audioRef.current.volume = 0.7; // Reasonable default volume
        audioRef.current.play().catch(e => {
          // Log error in development only
          if (process.env.NODE_ENV === 'development') {
            console.error("Error playing sound:", e);
          }
        });
      }
    }
  }, [settings.soundUrl]);
  
  const showNotification = (title: string, body: string) => {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        const notification = new Notification(title, { 
          body,
          icon: '/icons/icon48.png',
          badge: '/icons/icon16.png',
          tag: 'focus-smile-timer',
          requireInteraction: false,
          silent: false
        });
        
        // Auto-close after 5 seconds
        setTimeout(() => notification.close(), 5000);
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            showNotification(title, body);
          }
        });
      }
    }
  };

  const startNextSession = useCallback(() => {
    setIsActive(false);
    setShowSmilePopup(false);

    let nextSessionType: SessionType;
    let nextSessionCount = timerState.sessionCount;
    let newCompletedWorkSessions = completedWorkSessionsToday;

    if (timerState.sessionType === 'work') {
      newCompletedWorkSessions++;
      if (newCompletedWorkSessions % LONG_BREAK_INTERVAL === 0) {
        nextSessionType = 'longBreak';
      } else {
        nextSessionType = 'shortBreak';
      }
    } else {
      nextSessionType = 'work';
      nextSessionCount++;
    }
    
    setCompletedWorkSessionsToday(newCompletedWorkSessions);
    
    setTimerState({
      remainingSec: settings.durations[nextSessionType],
      sessionType: nextSessionType,
      sessionCount: nextSessionCount,
    });
    
    showNotification(
        "Session Over!",
        `Time for your ${nextSessionType === 'work' ? 'Focus Session' : nextSessionType === 'shortBreak' ? 'Short Break' : 'Long Break'}.`
    );

  }, [timerState, settings.durations, completedWorkSessionsToday]);

  // Enhanced timer control functions
  const startTimer = useCallback(() => {
    if (startTimeRef.current) return; // Already running
    
    startTimeRef.current = performance.now();
    expectedEndTimeRef.current = startTimeRef.current + (timerState.remainingSec * 1000);
    lastTickRef.current = timerState.remainingSec;
    
    setIsActive(true);
    tick();
  }, [timerState.remainingSec, tick]);

  const pauseTimer = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Record partial session if it was significant (>1 minute)
    if (startTimeRef.current) {
      const elapsed = performance.now() - startTimeRef.current;
      if (elapsed > 60000) { // More than 1 minute
        setSessionHistory(prev => [...prev, {
          type: timerState.sessionType,
          duration: Math.floor(elapsed / 1000),
          completed: false,
          timestamp: Date.now()
        }]);
      }
    }

    startTimeRef.current = null;
    setIsActive(false);
  }, [timerState.sessionType]);

  const resetTimer = useCallback(() => {
    pauseTimer();
    setTimerState(prev => ({ 
      ...prev, 
      remainingSec: settings.durations[prev.sessionType] 
    }));
    lastTickRef.current = settings.durations[timerState.sessionType];
  }, [pauseTimer, settings.durations, timerState.sessionType]);

  // Handle visibility change for background timer accuracy
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isActive && startTimeRef.current) {
        // Tab became hidden, switch to interval-based timing
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
        
        intervalRef.current = setInterval(tick, 100);
      } else if (!document.hidden && isActive && startTimeRef.current) {
        // Tab became visible, switch back to requestAnimationFrame
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        
        tick();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isActive, tick]);

  useEffect(() => {
    audioRef.current = new Audio();
    if (chrome && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(STORAGE_KEY_TIMER_STATE, (result: any) => {
        const stored = result[STORAGE_KEY_TIMER_STATE];
        if (stored) {
          const loadedSettings = {
            durations: stored.settings?.durations || DEFAULT_DURATIONS,
            soundUrl: stored.settings?.soundUrl !== undefined ? stored.settings.soundUrl : DEFAULT_SOUND_URL,
          };
          setSettings(loadedSettings);
          setTimerState(stored.timerState || { remainingSec: loadedSettings.durations.work, sessionType: 'work', sessionCount: 0 });
          setCompletedWorkSessionsToday(stored.completedWorkSessionsToday || 0);
        } else {
           setTimerState(prev => ({...prev, remainingSec: settings.durations.work}));
        }
      });
    }
    
    if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        Notification.requestPermission();
    }
    
    // Load session history and analytics
    if (chrome && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(['sessionHistory', 'analytics'], (result: any) => {
        if (result.sessionHistory) {
          setSessionHistory(result.sessionHistory);
        }
        if (result.analytics) {
          setTotalFocusTimeToday(result.analytics.totalFocusTimeToday || 0);
          setCurrentStreak(result.analytics.currentStreak || 0);
          setLongestStreak(result.analytics.longestStreak || 0);
          setLastSessionEndTime(result.analytics.lastSessionEndTime || null);
        }
      });
    }
  }, []);

  // Save analytics to storage
  useEffect(() => {
    if (chrome && chrome.storage && chrome.storage.local) {
      const analytics = {
        totalFocusTimeToday,
        currentStreak,
        longestStreak,
        lastSessionEndTime
      };
      chrome.storage.local.set({ 
        sessionHistory: sessionHistory.slice(-100), // Keep last 100 sessions
        analytics 
      });
    }
  }, [totalFocusTimeToday, currentStreak, longestStreak, sessionHistory, lastSessionEndTime]);

  useEffect(() => {
    if (chrome && chrome.storage && chrome.storage.local) {
      const stateToSave = {
        settings,
        timerState,
        completedWorkSessionsToday
      };
      chrome.storage.local.set({ [STORAGE_KEY_TIMER_STATE]: stateToSave });
    }
  }, [settings, timerState, completedWorkSessionsToday]);

  const skipSession = () => {
    if (window.confirm('Are you sure you want to skip to the next session?')) {
      // Record skipped session
      if (startTimeRef.current) {
        const elapsed = performance.now() - startTimeRef.current;
        setSessionHistory(prev => [...prev, {
          type: timerState.sessionType,
          duration: Math.floor(elapsed / 1000),
          completed: false,
          timestamp: Date.now()
        }]);
      }
      
      pauseTimer();
      startNextSession();
    }
  };
  
  const confirmSmileAndProceed = () => {
      startNextSession();
  };
  
  const triggerSmilePopup = () => {
      setShowSmilePopup(true);
  }

  const updateSettings = (newSettings: Partial<TimerSettings>) => {
    const updated = { 
        ...settings, 
        ...newSettings,
        durations: { ...settings.durations, ...newSettings.durations }
    };
    setSettings(updated);
    if (!isActive) {
        setTimerState(ts => ({...ts, remainingSec: updated.durations[ts.sessionType]}));
    }
  };

  const updateTimerSettings = useCallback((type: 'work' | 'shortBreak' | 'longBreak', value: number) => {
    setSettings(prevSettings => {
      const newDurations = { ...prevSettings.durations, [type]: value * 60 };
      return { ...prevSettings, durations: newDurations };
    });
    if (!isActive) {
      setTimerState(prevTimerState => ({
        ...prevTimerState,
        remainingSec: settings.durations[prevTimerState.sessionType],
      }));
    }
  }, [settings.durations, isActive]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const value = {
    timerState,
    isActive,
    startTimer,
    pauseTimer,
    resetTimer,
    skipSession,
    settings,
    updateSettings,
    completedWorkSessionsToday,
    showSmilePopup,
    confirmSmileAndProceed,
    triggerSmilePopup,
    updateTimerSettings,
    // Enhanced analytics
    totalFocusTimeToday,
    currentStreak,
    longestStreak,
    averageSessionLength,
    productivity,
    lastSessionEndTime,
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