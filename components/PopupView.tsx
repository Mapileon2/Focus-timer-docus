import React, { useState, useEffect } from 'react';
import { useTimer } from '../hooks/useTimer';
import { useApiKey } from '../hooks/useApiKey';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from './ui/tooltip';
import { Alert, AlertDescription } from './ui/alert';
import KeyIcon from './icons/KeyIcon';
import ApiKeySettingsModal from './ApiKeySettingsModal';
import { DotPattern } from './magicui/dot-pattern';
import { NumberTicker } from './magicui/number-ticker';
import { 
  EnhancedCircularTimer, 
  ModernButton, 
  StatusIndicator, 
  ModernCard,
  ModernTimerDisplay,
  ModernControlPanel,
  PrecisionTimer
} from './modern-ui';
import { Badge } from './ui/badge';
import { cn } from '../utils/design-system';

const PopupView = () => {
  const { timerState, isActive, startTimer, pauseTimer, resetTimer, skipSession, settings, completedWorkSessionsToday } = useTimer();
  const { isKeySet, openSettingsModal, isSettingsModalOpen, closeSettingsModal } = useApiKey();
  const [isDark, setIsDark] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    
    // Update current time every minute
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timeInterval);
  }, []);

  // Detect system theme
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

    const getSessionTypeDisplay = (type: string) => {
        switch (type) {
            case 'work': return { label: 'Focus', emoji: '🎯', color: 'bg-blue-500', textColor: 'text-blue-600', gradient: 'from-blue-500 to-blue-600' };
            case 'shortBreak': return { label: 'Break', emoji: '☕', color: 'bg-green-500', textColor: 'text-green-600', gradient: 'from-green-500 to-green-600' };
            case 'longBreak': return { label: 'Rest', emoji: '🌟', color: 'bg-purple-500', textColor: 'text-purple-600', gradient: 'from-purple-500 to-purple-600' };
            default: return { label: 'Session', emoji: '⏱️', color: 'bg-gray-500', textColor: 'text-gray-600', gradient: 'from-gray-500 to-gray-600' };
        }
    };

    const sessionDisplay = getSessionTypeDisplay(timerState.sessionType);

    const openFullApp = () => {
        if (typeof (globalThis as any).chrome !== 'undefined' && (globalThis as any).chrome.tabs) {
            (globalThis as any).chrome.tabs.create({ url: (globalThis as any).chrome.runtime.getURL('fullapp.html') });
            window.close();
        } else {
            window.open('fullapp.html', '_blank');
        }
    };

    const getGreeting = () => {
      const hour = currentTime.getHours();
      if (hour < 12) return '🌅 Good Morning';
      if (hour < 17) return '☀️ Good Afternoon';
      if (hour < 21) return '🌆 Good Evening';
      return '🌙 Good Night';
    };
    return (
        <TooltipProvider>
            <div className={cn(
              'w-full h-full relative overflow-hidden',
              'bg-gradient-to-br from-slate-50 via-white to-slate-100',
              'dark:from-slate-950 dark:via-slate-900 dark:to-slate-800',
              'text-foreground transition-all duration-500',
              isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}>
                {/* Subtle background pattern */}
                <DotPattern 
                    className="opacity-20 dark:opacity-10" 
                    width={20} 
                    height={20} 
                    cx={1} 
                    cy={1} 
                    cr={1} 
                />
                
                {/* Enhanced Glass Header */}
                <div className={cn(
                  'relative overflow-hidden backdrop-blur-xl border-b shadow-lg',
                  'bg-white/70 dark:bg-slate-900/70',
                  'border-slate-200/50 dark:border-slate-700/50',
                  'transition-all duration-300',
                  isActive && 'bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20'
                )}>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-50" />
                    <div className="relative px-6 py-5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className={cn(
                                      'w-16 h-16 rounded-2xl p-0.5 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl',
                                      `bg-gradient-to-br ${sessionDisplay.gradient}`
                                    )}>
                                        <img src="/icons/icon48.png" alt="Focus Smile" className="w-full h-full rounded-2xl object-cover" />
                                    </div>
                                    <StatusIndicator
                                        status={isActive ? 'active' : 'inactive'}
                                        size="md"
                                        className="absolute -top-2 -right-2 shadow-md"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <h1 className={cn(
                                      'text-2xl font-bold bg-clip-text text-transparent tracking-tight transition-all duration-300',
                                      `bg-gradient-to-r ${sessionDisplay.gradient}`
                                    )}>
                                        Focus & Smile
                                    </h1>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium flex items-center gap-2 transition-all duration-300">
                                        <NumberTicker value={completedWorkSessionsToday} className={cn('font-bold text-base', sessionDisplay.textColor)} />
                                        <span className="text-slate-500 dark:text-slate-400">sessions today</span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <div className="text-xs text-slate-500 dark:text-slate-400">
                                  {getGreeting()}
                                </div>
                                <div className="text-xs text-slate-400 dark:text-slate-500">
                                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                              </div>
                              <Tooltip>
                                  <TooltipTrigger asChild>
                                      <ModernButton
                                          onClick={openSettingsModal}
                                          variant="glass"
                                          size="sm"
                                          className="h-11 w-11 rounded-full p-0 shadow-lg hover:shadow-xl"
                                          icon={<KeyIcon className="w-5 h-5" />}
                                      />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                      <p>Configure API Settings</p>
                                  </TooltipContent>
                              </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Timer Section */}
                <div className="flex-grow px-6 py-5 space-y-6 overflow-y-auto">
                    {/* Precision Timer Logic */}
                    <PrecisionTimer
                      duration={timerState.remainingSec}
                      isActive={isActive}
                      onTick={(remaining) => {
                        // Timer tick handled by useTimer hook
                      }}
                      onComplete={() => {
                        // Completion handled by useTimer hook
                      }}
                    />
                    
                    <div className="flex justify-center">
                        <EnhancedCircularTimer
                            timerState={timerState}
                            isActive={isActive}
                            settings={settings}
                            size={280}
                            variant="glass"
                            showSessionInfo={true}
                        />
                    </div>
                    
                    {/* Modern Control Panel */}
                    <div className="flex justify-center">
                        <ModernControlPanel
                            isActive={isActive}
                            sessionType={timerState.sessionType}
                            onStart={startTimer}
                            onPause={pauseTimer}
                            onReset={resetTimer}
                            onSkip={skipSession}
                            onSettings={openSettingsModal}
                            size="md"
                            layout="horizontal"
                        />
                    </div>

                    {/* Enhanced Quick Actions */}
                    <div className="space-y-4">
                        <ModernCard variant="glass" className="p-4">
                            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 transition-all duration-300 mb-3">
                                <span>📈</span>
                                Today's Progress
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-3 backdrop-blur-sm transition-all duration-300 hover:bg-white/70 dark:hover:bg-slate-800/70 hover:scale-105">
                                    <div className="text-xs text-slate-600 dark:text-slate-400 transition-all duration-300">Sessions</div>
                                    <div className="text-lg font-semibold text-slate-900 dark:text-slate-100 transition-all duration-300">
                                      <NumberTicker value={completedWorkSessionsToday} />
                                    </div>
                                </div>
                                <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-3 backdrop-blur-sm transition-all duration-300 hover:bg-white/70 dark:hover:bg-slate-800/70 hover:scale-105">
                                    <div className="text-xs text-slate-600 dark:text-slate-400 transition-all duration-300">Focus Time</div>
                                    <div className="text-lg font-semibold text-slate-900 dark:text-slate-100 transition-all duration-300">
                                      <NumberTicker value={Math.floor((completedWorkSessionsToday * settings.durations.work) / 60)} suffix="m" />
                                    </div>
                                </div>
                            </div>
                        </ModernCard>
                        
                        <ModernCard variant="glass" className="p-4">
                            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 transition-all duration-300 mb-3">
                                <span>✨</span>
                                Quick Actions
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <ModernButton
                                    variant="glass"
                                    size="md"
                                    fullWidth
                                    onClick={openFullApp}
                                    icon={<span>📊</span>}
                                    className="h-12 transition-all duration-300 hover:scale-105"
                                >
                                    Dashboard
                                </ModernButton>
                                <ModernButton
                                    variant="glass"
                                    size="md"
                                    fullWidth
                                    onClick={openSettingsModal}
                                    icon={<span>⚙️</span>}
                                    className="h-12 transition-all duration-300 hover:scale-105"
                                >
                                    Settings
                                </ModernButton>
                            </div>
                        </ModernCard>
                        
                        {/* Session Status Card */}
                        <ModernCard variant="glass" className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Badge className={cn(
                                      'px-3 py-1 font-semibold border-0',
                                      sessionDisplay.textColor,
                                      'bg-white/50 dark:bg-slate-800/50'
                                    )}>
                                        <span className="mr-2">{sessionDisplay.emoji}</span>
                                        {sessionDisplay.label}
                                    </Badge>
                                    <StatusIndicator
                                        status={isActive ? 'active' : 'paused'}
                                        size="sm"
                                        animated={isActive}
                                        showLabel={true}
                                        label={isActive ? 'Running' : 'Paused'}
                                    />
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">
                                    Session #{timerState.sessionCount + 1}
                                </div>
                            </div>
                        </ModernCard>
                    </div>
                </div>

                {/* Enhanced Footer */}
                <div className="px-6 py-4 border-t border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 mt-auto bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 transition-all duration-300">
                        <div>
                            {currentTime.toLocaleDateString('en', { 
                                weekday: 'short', 
                                month: 'short', 
                                day: 'numeric' 
                            })}
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setIsDark(!isDark)}
                                className="p-1 text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors duration-200 rounded-full hover:bg-white/50 dark:hover:bg-slate-800/50"
                                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                            >
                                {isDark ? (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                )}
                            </button>
                            <span className="text-slate-400 dark:text-slate-500">v2.2</span>
                        </div>
                    </div>
                </div>

                <ApiKeySettingsModal isOpen={isSettingsModalOpen} onClose={closeSettingsModal} />
            </div>
        </TooltipProvider>
    );
}

export default PopupView;