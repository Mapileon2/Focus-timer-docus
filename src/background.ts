import { TimerState, TimerSettings, SessionType } from '../types';

const DEFAULT_DURATIONS = {
  work: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

const LONG_BREAK_INTERVAL = 4;
const STORAGE_KEY = 'timerState';
const ALARM_NAME = 'pomodoroTimer';

interface AppState {
  timerState: TimerState;
  settings: TimerSettings;
  isActive: boolean;
  completedWorkSessionsToday: number;
}

let state: AppState = {
  isActive: false,
  completedWorkSessionsToday: 0,
  settings: {
    durations: DEFAULT_DURATIONS,
    soundUrl: 'default_sound.mp3', // Placeholder
  },
  timerState: {
    remainingSec: DEFAULT_DURATIONS.work,
    sessionType: 'work',
    sessionCount: 0,
  },
};

const saveState = async () => {
  await chrome.storage.local.set({ [STORAGE_KEY]: state });
};

const broadcastState = async () => {
  const message = { type: 'TIMER_STATE_UPDATE', payload: state };
  await chrome.runtime.sendMessage(message).catch((error: any) => {
    // Suppress "Could not establish connection" errors when popup is not open
    if (error.message.includes('Could not establish connection')) {
      return;
    }
    console.error('Error broadcasting state:', error);
  });
};

const startNextSession = () => {
  state.isActive = false;

  let nextSessionType: SessionType;
  let nextSessionCount = state.timerState.sessionCount;

  if (state.timerState.sessionType === 'work') {
    state.completedWorkSessionsToday++;
    if (state.completedWorkSessionsToday > 0 && state.completedWorkSessionsToday % LONG_BREAK_INTERVAL === 0) {
      nextSessionType = 'longBreak';
    } else {
      nextSessionType = 'shortBreak';
    }
  } else {
    nextSessionType = 'work';
    nextSessionCount++;
  }

  state.timerState = {
    remainingSec: state.settings.durations[nextSessionType],
    sessionType: nextSessionType,
    sessionCount: nextSessionCount,
  };

  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icons/icon128.png',
    title: 'Session Over!',
    message: `Time for your ${nextSessionType === 'work' ? 'Work Session' : 'Break'}.`,
  });

  saveState();
  broadcastState();
};


const tick = () => {
  if (!state.isActive) return;

  state.timerState.remainingSec--;

  if (state.timerState.remainingSec <= 0) {
    chrome.alarms.clear(ALARM_NAME);
    startNextSession();
  } else {
    // Persist the timer state on every tick.
    saveState();
    broadcastState();
  }
};

const startTimer = () => {
  if (state.isActive) return;
  state.isActive = true;
  chrome.alarms.create(ALARM_NAME, { periodInMinutes: 1 / 60 });
  saveState();
  broadcastState();
};

const pauseTimer = () => {
  if (!state.isActive) return;
  state.isActive = false;
  chrome.alarms.clear(ALARM_NAME);
  saveState();
  broadcastState();
};

const resetTimer = () => {
  state.isActive = false;
  state.timerState.remainingSec = state.settings.durations[state.timerState.sessionType];
  chrome.alarms.clear(ALARM_NAME);
  saveState();
  broadcastState();
};

const skipSession = () => {
  chrome.alarms.clear(ALARM_NAME);
  startNextSession();
};

const updateSettings = (newSettings: Partial<TimerSettings>) => {
    state.settings = {
        ...state.settings,
        ...newSettings,
        durations: { ...state.settings.durations, ...newSettings.durations }
    };
    // If timer is not active, update remaining time based on new settings
    if (!state.isActive) {
        state.timerState.remainingSec = state.settings.durations[state.timerState.sessionType];
    }
    saveState();
    broadcastState();
}

const initializeState = async () => {
  const result = await chrome.storage.local.get(STORAGE_KEY);
  if (result[STORAGE_KEY]) {
    state = result[STORAGE_KEY];
    // If the timer was active when the browser closed, we should probably
    // move it to a paused state to avoid unexpected behavior on startup.
    // For now, we trust the stored state. If it was active, the alarm will
    // need to be re-initialized if it doesn't persist across restarts.
    // Let's ensure the alarm is running if the state says it should be.
    if (state.isActive) {
        chrome.alarms.create(ALARM_NAME, { periodInMinutes: 1 / 60 });
    }
  }
  console.log("State initialized:", state);
};

chrome.runtime.onInstalled.addListener(initializeState);
chrome.runtime.onStartup.addListener(initializeState);

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === ALARM_NAME) {
    tick();
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case 'START_TIMER':
      startTimer();
      break;
    case 'PAUSE_TIMER':
      pauseTimer();
      break;
    case 'RESET_TIMER':
      resetTimer();
      break;
    case 'SKIP_SESSION':
      skipSession();
      break;
    case 'UPDATE_SETTINGS':
      updateSettings(message.payload);
      break;
    case 'GET_TIMER_STATE':
      broadcastState(); // Send current state immediately on request
      break;
  }
  // Return true to indicate you wish to send a response asynchronously
  return true;
});
