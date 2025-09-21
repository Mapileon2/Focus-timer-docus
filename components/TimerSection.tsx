import React, { useState, useEffect } from 'react';
import { useTimer } from '../hooks/useTimer';
import TimerDisplay from './TimerDisplay';
import { TimerSettingsModal } from './TimerSettingsModal';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import PlayIcon from './icons/PlayIcon';
import PauseIcon from './icons/PauseIcon';
import ResetIcon from './icons/ResetIcon';
import SkipIcon from './icons/SkipIcon';
import SettingsIcon from './icons/SettingsIcon';
import { Progress } from './ui/progress';

const TimerSection = () => {
    const { timerState, isActive, startTimer, pauseTimer, resetTimer, skipSession, settings, updateSettings, completedWorkSessionsToday } = useTimer();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    // Auto-start timer for testing purposes
    useEffect(() => {
        startTimer();
    }, [startTimer]);

    const getSessionTypeDisplay = (type: string) => {
        switch (type) {
            case 'work': return { label: 'Focus Time', emoji: '🎯', color: 'bg-blue-500', textColor: 'text-blue-600' };
            case 'shortBreak': return { label: 'Short Break', emoji: '☕', color: 'bg-green-500', textColor: 'text-green-600' };
            case 'longBreak': return { label: 'Long Break', emoji: '🌟', color: 'bg-purple-500', textColor: 'text-purple-600' };
            default: return { label: 'Session', emoji: '⏱️', color: 'bg-gray-500', textColor: 'text-gray-600' };
        }
    };

    const sessionDisplay = getSessionTypeDisplay(timerState.sessionType);
    const progressValue = ((settings.durations[timerState.sessionType] - timerState.remainingSec) / (settings.durations[timerState.sessionType] || 1)) * 100;

    return (
        <Card className="border-0 shadow-sm bg-white dark:bg-gray-950">
            <CardHeader className="pb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Badge 
                            variant="secondary" 
                            className={`${sessionDisplay.textColor} bg-gray-100 dark:bg-gray-800 border-0 px-4 py-2 text-sm font-medium`}
                        >
                            <span className="mr-2">{sessionDisplay.emoji}</span>
                            {sessionDisplay.label}
                        </Badge>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-medium">{completedWorkSessionsToday}</span>
                            <span>sessions today</span>
                        </div>
                    </div>
                    <div>
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setIsSettingsOpen(true)} 
                            aria-label="Timer settings"
                            className="h-9 w-9 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <SettingsIcon className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-8">
                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>Progress</span>
                        <span>{Math.round(progressValue)}%</span>
                    </div>
                    <div className="relative">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                                className={`h-2 rounded-full transition-all duration-300 ${sessionDisplay.color}`}
                                style={{ width: `${progressValue}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Timer Display */}
                <TimerDisplay timerState={timerState} />

                {/* Control Buttons */}
                <div className="flex items-center justify-center gap-8">
                    <div className="flex flex-col items-center gap-2">
                        <Button 
                            variant="outline" 
                            size="lg" 
                            onClick={resetTimer} 
                            aria-label="Reset timer"
                            className="h-14 w-14 rounded-full border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                            <ResetIcon className="w-5 h-5" />
                        </Button>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Reset</span>
                    </div>
                    
                    <div className="flex flex-col items-center gap-2">
                           <Button 
                              data-testid="timer-toggle-button"
                              size="lg" 
                              onClick={isActive ? pauseTimer : startTimer}
                             className={`h-20 w-20 rounded-full font-semibold text-lg shadow-lg transition-all duration-200 ${
                                 isActive 
                                     ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/25' 
                                     : `${sessionDisplay.color} hover:opacity-90 text-white shadow-lg`
                             }`}
                             aria-label={isActive ? 'Pause' : 'Start'}
                         >
                             {isActive ? (
                                 <PauseIcon className="w-8 h-8" data-testid="PauseIcon" />
                             ) : (
                                 <PlayIcon className="w-8 h-8" data-testid="PlayIcon" />
                             )}
                         </Button>
                          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                              {isActive ? 'Pause' : 'Start'}
                        </span>
                    </div>
                    
                    <div className="flex flex-col items-center gap-2">
                        <Button 
                            variant="outline" 
                            size="lg" 
                            onClick={skipSession} 
                            aria-label="Skip session"
                            className="h-14 w-14 rounded-full border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                            <SkipIcon className="w-5 h-5" />
                        </Button>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Skip</span>
                    </div>
                </div>
            </CardContent>

            <TimerSettingsModal 
                isOpen={isSettingsOpen} 
                onClose={() => setIsSettingsOpen(false)} 
                settings={settings}
                onSave={updateSettings}
            />
        </Card>
    );
};

export default TimerSection;