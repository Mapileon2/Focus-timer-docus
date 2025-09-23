import React, { useState, useEffect } from 'react';
import { useTimer } from '../hooks/useTimer';
import TimerDisplay from './TimerDisplay';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { 
  ModernTimerDisplay, 
  ModernControlPanel, 
  PrecisionTimer,
  ModernSettingsPanel,
  useSmartNotifications
} from './modern-ui';
import PlayIcon from './icons/PlayIcon';
import PauseIcon from './icons/PauseIcon';
import ResetIcon from './icons/ResetIcon';
import SkipIcon from './icons/SkipIcon';
import SettingsIcon from './icons/SettingsIcon';

const TimerSection = () => {
    const { timerState, isActive, startTimer, pauseTimer, resetTimer, skipSession, settings, updateSettings, completedWorkSessionsToday } = useTimer();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const { notifications, addNotification, dismissNotification, notifySessionComplete, notifyTimerStarted } = useSmartNotifications();
    const [lastSessionType, setLastSessionType] = useState(timerState.sessionType);

    // Handle session transitions and notifications
    useEffect(() => {
        if (timerState.sessionType !== lastSessionType) {
            setLastSessionType(timerState.sessionType);
            if (isActive) {
                notifyTimerStarted(timerState.sessionType, settings.durations[timerState.sessionType]);
            }
        }
    }, [timerState.sessionType, lastSessionType, isActive, settings.durations, notifyTimerStarted]);

    // Handle timer completion
    useEffect(() => {
        if (timerState.remainingSec === 0 && !isActive) {
            notifySessionComplete(timerState.sessionType);
        }
    }, [timerState.remainingSec, isActive, timerState.sessionType, notifySessionComplete]);

    const getSessionTypeDisplay = (type: string) => {
        switch (type) {
            case 'work': return { 
              label: 'Focus Time', 
              emoji: '🎯', 
              color: 'bg-blue-500', 
              textColor: 'text-blue-600',
              gradient: 'from-blue-500 to-blue-600',
              description: 'Deep work and concentration'
            };
            case 'shortBreak': return { 
              label: 'Short Break', 
              emoji: '☕', 
              color: 'bg-green-500', 
              textColor: 'text-green-600',
              gradient: 'from-green-500 to-green-600',
              description: 'Quick rest and recharge'
            };
            case 'longBreak': return { 
              label: 'Long Break', 
              emoji: '🌟', 
              color: 'bg-purple-500', 
              textColor: 'text-purple-600',
              gradient: 'from-purple-500 to-purple-600',
              description: 'Extended rest and recovery'
            };
            default: return { 
              label: 'Session', 
              emoji: '⏱️', 
              color: 'bg-gray-500', 
              textColor: 'text-gray-600',
              gradient: 'from-gray-500 to-gray-600',
              description: 'Timer session'
            };
        }
    };

    const sessionDisplay = getSessionTypeDisplay(timerState.sessionType);
    const progressValue = ((settings.durations[timerState.sessionType] - timerState.remainingSec) / (settings.durations[timerState.sessionType] || 1)) * 100;

    const handleSettingsChange = (newSettings: any) => {
        updateSettings(newSettings);
        addNotification({
            title: 'Settings Updated',
            message: 'Your timer preferences have been saved.',
            type: 'success',
            duration: 3000
        });
    };
    return (
        <div className="space-y-6">
            {/* Precision Timer Logic */}
            <PrecisionTimer
                duration={timerState.remainingSec}
                isActive={isActive}
                onTick={(remaining) => {
                    // Timer updates handled by useTimer hook
                }}
                onComplete={() => {
                    // Completion handled by useTimer hook
                }}
            />

            {/* Main Timer Card */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 overflow-hidden">
                <CardHeader className="pb-6 bg-gradient-to-r from-transparent to-white/50 dark:to-slate-800/50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="space-y-2">
                          <Badge 
                              className={cn(
                                  'font-semibold border-0 shadow-lg px-4 py-2',
                              )
                              }
                          </Badge>
                          <p className="text-xs text-slate-600 dark:text-slate-400">
                            {sessionDisplay.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                          >
                            <span>sessions today</span>
                            <div className="w-1 h-1 bg-slate-400 rounded-full" />
                            <span className="font-medium">{Math.floor((completedWorkSessionsToday * settings.durations.work) / 3600)}h</span>
                            <span>total focus</span>
                        </div>
                    </div>
                    <div>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => setIsSettingsOpen(true)} 
                                    aria-label="Timer settings"
                                    className="h-9 w-9 p-0 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200 hover:scale-110"
                                >
                                    <SettingsIcon className="w-4 h-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Timer Settings</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-8">
                {/* Enhanced Progress Visualization */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>Progress</span>
                        <span className="font-semibold">{Math.round(progressValue)}%</span>
                    </div>
                    <div className="relative">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                            <div 
                                className={cn(
                                  'h-3 rounded-full transition-all duration-500 ease-out relative overflow-hidden',
                                  `bg-gradient-to-r ${sessionDisplay.gradient}`
                                )}
                                style={{ width: `${progressValue}%` }}
                            >
                                {/* Shimmer effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                            </div>
                        </div>
                        
                        {/* Time markers */}
                        <div className="flex justify-between mt-1 text-xs text-slate-400 dark:text-slate-500">
                            <span>0:00</span>
                            <span>{Math.floor(settings.durations[timerState.sessionType] / 60)}:00</span>
                        </div>
                    </div>
                </div>

                {/* Modern Timer Display */}
                <ModernTimerDisplay
                    remainingSeconds={timerState.remainingSec}
                    sessionType={timerState.sessionType}
                    sessionCount={timerState.sessionCount}
                    isActive={isActive}
                    totalDuration={settings.durations[timerState.sessionType]}
                    size="lg"
                    showProgress={true}
                    showSessionInfo={false} // Already shown in header
                />

                {/* Enhanced Control Panel */}
                <div className="flex justify-center">
                    <ModernControlPanel
                        isActive={isActive}
                        sessionType={timerState.sessionType}
                        onStart={() => {
                            startTimer();
                            notifyTimerStarted(timerState.sessionType, settings.durations[timerState.sessionType]);
                        }}
                        onPause={pauseTimer}
                        onReset={resetTimer}
                        onSkip={skipSession}
                        onSettings={() => setIsSettingsOpen(true)}
                        size="lg"
                        layout="horizontal"
                        showLabels={true}
                    />
                </div>
            </CardContent>
        </Card>

        {/* Modern Settings Panel */}
        {isSettingsOpen && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    <ModernSettingsPanel
                        durations={{
                            work: settings.durations.work,
                            shortBreak: settings.durations.shortBreak,
                            longBreak: settings.durations.longBreak
                        }}
                        notifications={{
                            enabled: true,
                            sound: true,
                            desktop: true,
                            soundUrl: settings.soundUrl,
                            volume: 70
                        }}
                        theme={{
                            mode: 'auto',
                            accentColor: '#4285F4',
                            backgroundStyle: 'gradient'
                        }}
                        onDurationsChange={(durations) => {
                            updateSettings({ durations });
                        }}
                        onNotificationsChange={(notifications) => {
                            updateSettings({ soundUrl: notifications.soundUrl });
                        }}
                        onThemeChange={(theme) => {
                            // Handle theme changes
                        }}
                        onReset={() => {
                            updateSettings({
                                durations: {
                                    work: 25 * 60,
                                    shortBreak: 5 * 60,
                                    longBreak: 15 * 60
                                }
                            });
                        }}
                        onExport={() => {
                            const data = JSON.stringify(settings, null, 2);
                            const blob = new Blob([data], { type: 'application/json' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = 'focus-smile-settings.json';
                            a.click();
                            URL.revokeObjectURL(url);
                        }}
                        onImport={(data) => {
                            updateSettings(data);
                        }}
                    />
                    
                    {/* Close button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsSettingsOpen(false)}
                        className="absolute top-4 right-4 rounded-full w-8 h-8 p-0"
                    >
                        ✕
                    </Button>
                </div>
            </div>
        )}
        
        {/* Smart Notification System */}
        <SmartNotificationSystem
            notifications={notifications}
            onDismiss={dismissNotification}
            position="top-right"
            maxVisible={3}
        />
        </div>
    );
};

export default TimerSection;

                isOpen={isSettingsOpen} 
                onClose={() => setIsSettingsOpen(false)} 
                settings={settings}
                onSave={updateSettings}
            />
        </Card>
    );
};

export default TimerSection;