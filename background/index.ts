import { TimerState, TimerSettings, SessionType } from '../types';
import { STORAGE_KEY_TIMER_STATE, DEFAULT_SOUND_URL } from '../constants';

// --- Constants ---
const DEFAULT_DURATIONS = {
  work: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};
const LONG_BREAK_INTERVAL = 4;
const OFFSCREEN_DOCUMENT_PATH = 'offscreen.html';

// --- State Management ---
let timerInterval: NodeJS.Timeout | null = null;
let timerState: TimerState;
let timerSettings: TimerSettings;
let isActive = false;
let completedWorkSessionsToday = 0;

async function getInitialState() {
    const result = await chrome.storage.local.get(STORAGE_KEY_TIMER_STATE);
    const stored = result[STORAGE_KEY_TIMER_STATE] || {};

    timerSettings = {
        durations: stored.settings?.durations || DEFAULT_DURATIONS,
        soundUrl: stored.settings?.soundUrl ?? DEFAULT_SOUND_URL,
    };

    timerState = stored.timerState || {
        remainingSec: timerSettings.durations.work,
        sessionType: 'work',
        sessionCount: 0,
    };

    isActive = stored.isActive || false;
    completedWorkSessionsToday = stored.completedWorkSessionsToday || 0;

    if (isActive) {
        startTimerInterval();
    }
}

async function saveState(showSmilePopup = false) {
    const stateToSave = {
        settings: timerSettings,
        timerState,
        isActive,
        completedWorkSessionsToday,
        showSmilePopup
    };
    await chrome.storage.local.set({ [STORAGE_KEY_TIMER_STATE]: stateToSave });
}

// --- Timer Logic ---
function startTimerInterval() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(async () => {
        if (timerState.remainingSec > 0) {
            timerState.remainingSec--;
            await saveState();
        } else {
            await handleSessionEnd();
        }
    }, 1000);
}

async function handleSessionEnd() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = null;
    isActive = false;

    await playSound();

    const previousSessionType = timerState.sessionType;

    // Determine next session
    let nextSessionType: SessionType;
    let nextSessionCount = timerState.sessionCount;
    let showSmilePopup = false;

    if (previousSessionType === 'work') {
        completedWorkSessionsToday++;
        showSmilePopup = true; // Show popup after a work session
        if (completedWorkSessionsToday > 0 && completedWorkSessionsToday % LONG_BREAK_INTERVAL === 0) {
            nextSessionType = 'longBreak';
        } else {
            nextSessionType = 'shortBreak';
        }
    } else {
        nextSessionType = 'work';
        nextSessionCount++;
    }

    timerState = {
        remainingSec: timerSettings.durations[nextSessionType],
        sessionType: nextSessionType,
        sessionCount: nextSessionCount,
    };

    await showNotification(
        "Session Over!",
        `Time for your ${nextSessionType.replace(/([A-Z])/g, ' $1').toLowerCase()}.`
    );

    // If we are not showing the smile popup, we can start the next session automatically
    if (!showSmilePopup) {
        isActive = true;
        startTimerInterval();
    }

    await saveState(showSmilePopup);
}


// --- Event Listeners ---
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    (async () => {
        switch (message.command) {
            case 'start':
                isActive = true;
                startTimerInterval();
                await saveState(false); // Hide smile popup on start
                break;
            case 'pause':
                isActive = false;
                if (timerInterval) clearInterval(timerInterval);
                timerInterval = null;
                await saveState();
                break;
            case 'reset':
                isActive = false;
                if (timerInterval) clearInterval(timerInterval);
                timerInterval = null;
                timerState.remainingSec = timerSettings.durations[timerState.sessionType];
                await saveState();
                break;
            case 'skip':
                await handleSessionEnd();
                break;
            case 'proceed':
                // This is called after the smile popup. We start the next session.
                isActive = true;
                startTimerInterval();
                await saveState(false); // Hide smile popup
                break;
             case 'updateSettings':
                timerSettings = message.settings;
                // If timer is not active, update remaining time based on new settings
                if (!isActive) {
                    timerState.remainingSec = timerSettings.durations[timerState.sessionType];
                }
                await saveState();
                break;
        }
    })();
    return true; // Indicates async response
});

chrome.runtime.onStartup.addListener(getInitialState);
chrome.runtime.onInstalled.addListener(getInitialState);

// --- Notifications ---
async function showNotification(title: string, body: string) {
    await chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon128.png',
        title: title,
        message: body,
    });
}

// --- Audio Playback with Offscreen API ---
let creatingOffscreen: Promise<void> | null;

async function hasOffscreenDocument(path: string): Promise<boolean> {
    if ('getContexts' in chrome.runtime) { // For Manifest V3
        const contexts = await chrome.runtime.getContexts({
            contextTypes: ['OFFSCREEN_DOCUMENT'],
            documentUrls: [chrome.runtime.getURL(path)]
        });
        return contexts.length > 0;
    }
    return false; // Fallback for older versions
}

async function playSound() {
    const soundUrl = timerSettings.soundUrl;
    if (!soundUrl) return;

    if (await hasOffscreenDocument(OFFSCREEN_DOCUMENT_PATH)) {
        chrome.runtime.sendMessage({
            command: 'playSound',
            target: 'offscreen',
            url: soundUrl
        });
    } else {
        if (creatingOffscreen) {
            await creatingOffscreen;
        } else {
            creatingOffscreen = chrome.offscreen.createDocument({
                url: OFFSCREEN_DOCUMENT_PATH,
                reasons: [chrome.offscreen.Reason.AUDIO_PLAYBACK],
                justification: 'Timer session completion sound',
            });
            await creatingOffscreen;
            creatingOffscreen = null;
        }
        // Now the document exists, send the message
         chrome.runtime.sendMessage({
            command: 'playSound',
            target: 'offscreen',
            url: soundUrl
        });
    }
}

// Initialize state when the script is first loaded
getInitialState();
