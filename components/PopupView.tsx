import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useTimer } from '../hooks/useTimer';
import { useApiKey } from '../hooks/useApiKey';
import { useTheme } from '../hooks/useTheme';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from './ui/tooltip';
import { Alert, AlertDescription } from './ui/alert';
import KeyIcon from './icons/KeyIcon';
import ApiKeySettingsModal from './ApiKeySettingsModal';
import { DotPattern } from './magicui/dot-pattern';
import { NumberTicker } from './magicui/number-ticker';
import { EnhancedCircularTimer, ModernButton, StatusIndicator, ModernCard } from './modern-ui';
import { getCurrentLanguage, t, getDirection, Language } from '../utils/i18n';

const PopupView = () => {
  const { timerState, isActive, startTimer, pauseTimer, resetTimer, skipSession, settings, completedWorkSessionsToday } = useTimer();
  const { isKeySet, openSettingsModal, isSettingsModalOpen, closeSettingsModal } = useApiKey();
  const { theme, effectiveTheme, setTheme, isDark } = useTheme();
  const [currentLang, setCurrentLang] = useState(getCurrentLanguage());

  // Spring animations for smooth transitions
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const fadeInProps = useSpring({
    opacity: isMounted ? 1 : 0,
    transform: isMounted ? 'translateY(0px)' : 'translateY(20px)',
    config: { tension: 200, friction: 20 }
  });

  const headerSpring = useSpring({
    transform: isActive ? 'scale(1.02)' : 'scale(1)',
    config: { tension: 300, friction: 30 }
  });

    const getSessionTypeDisplay = (type: string) => {
        const sessionLabels = {
            work: t('timer.focus', currentLang),
            shortBreak: t('timer.break', currentLang),
            longBreak: t('timer.rest', currentLang)
        };
        
        switch (type) {
            case 'work': return { label: sessionLabels.work, emoji: '🎯', color: 'bg-blue-500', textColor: 'text-blue-600' };
            case 'shortBreak': return { label: sessionLabels.shortBreak, emoji: '☕', color: 'bg-green-500', textColor: 'text-green-600' };
            case 'longBreak': return { label: sessionLabels.longBreak, emoji: '🌟', color: 'bg-purple-500', textColor: 'text-purple-600' };
            default: return { label: t('timer.session', currentLang), emoji: '⏱️', color: 'bg-gray-500', textColor: 'text-gray-600' };
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

    return (
        <TooltipProvider>
            <animated.div className={`w-full h-full relative overflow-hidden bg-background text-foreground`} style={fadeInProps} dir={getDirection(currentLang)}>
                {/* Subtle background pattern */}
                <DotPattern 
                    className="opacity-30 dark:opacity-20" 
                    width={20} 
                    height={20} 
                    cx={1} 
                    cy={1} 
                    cr={1} 
                />
                
                {/* Modern Glass Header */}
                <animated.div 
                    className="relative overflow-hidden bg-fs-glass-surface backdrop-blur-xl border-b border-fs-outline/30 dark:border-fs-outline-dark/30 shadow-fs-shadow-sm"
                    style={headerSpring}
                >
                    <div className="absolute inset-0 bg-fs-gradient-glass opacity-20" />
                    <div className="relative px-6 py-5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="w-16 h-16 rounded-2xl bg-fs-gradient-primary p-0.5 shadow-fs-shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                                        <img src="/icons/icon48.png" alt="Focus Smile" className="w-full h-full rounded-2xl object-cover" />
                                    </div>
                                    <StatusIndicator
                                        status={isActive ? 'active' : 'inactive'}
                                        size="md"
                                        className="absolute -top-2 -right-2 shadow-fs-shadow-md"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <h1 className="text-2xl font-bold bg-fs-gradient-text bg-clip-text text-transparent tracking-tight transition-all duration-300">
                                        Focus & Smile
                                    </h1>
                                    <p className="text-sm text-fs-on-surface-variant font-medium flex items-center gap-2 transition-all duration-300">
                                        <NumberTicker value={completedWorkSessionsToday} className="font-bold text-fs-primary text-base" />
                                        <span className="text-fs-on-surface-variant/80">sessions today</span>
                                    </p>
                                </div>
                            </div>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <ModernButton
                                        onClick={openSettingsModal}
                                        variant="glass"
                                        size="sm"
                                        className="h-11 w-11 rounded-full p-0"
                                        icon={<KeyIcon className="w-5 h-5" />}
                                    />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Configure API Settings</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </div>
                </animated.div>

                {/* Modern Enhanced Circular Timer */}
                <div className="flex-grow px-6 py-5 space-y-6 overflow-y-auto">
                    <div className="flex justify-center">
                        <EnhancedCircularTimer
                            timerState={timerState}
                            isActive={isActive}
                            settings={settings}
                            size={260}
                            variant="glass"
                            showSessionInfo={true}
                        />
                    </div>
                    
                    {/* Modern Control Buttons with Enhanced Accessibility */}
                    <div className="flex items-center justify-center gap-5" role="group" aria-label={t('timer.controls', currentLang)}>
                        <ModernButton
                            variant="secondary"
                            size="lg"
                            onClick={resetTimer}
                            icon={<span className="text-lg">🔄</span>}
                            className="w-14 h-14 rounded-full p-0 transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            aria-label={t('timer.reset', currentLang)}
                            title={t('timer.reset', currentLang)}
                        />
                        <ModernButton
                            variant={isActive ? "secondary" : "gradient"}
                            size="xl"
                            onClick={isActive ? pauseTimer : startTimer}
                            icon={isActive ? <span className="text-2xl">⏸️</span> : <span className="text-2xl">▶️</span>}
                            className="w-20 h-20 rounded-full p-0 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg"
                            aria-label={isActive ? t('timer.pause', currentLang) : t('timer.start', currentLang)}
                            title={isActive ? t('timer.pause', currentLang) : t('timer.start', currentLang)}
                        />
                        <ModernButton
                            variant="secondary"
                            size="lg"
                            onClick={skipSession}
                            icon={<span className="text-lg">⏭️</span>}
                            className="w-14 h-14 rounded-full p-0 transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            aria-label={t('timer.skip', currentLang)}
                            title={t('timer.skip', currentLang)}
                        />
                    </div>

                    {/* Modern Quick Actions */}
                    <div className="space-y-4">
                        <ModernCard className="p-4">
                            <h3 className="text-sm font-semibold text-fs-on-surface-variant flex items-center gap-2 transition-all duration-300 mb-3">
                                <span>📈</span>
                                Today's Progress
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-fs-surface-container-low rounded-lg p-3 backdrop-blur-sm transition-all duration-300 hover:bg-fs-surface-container-low-hover">
                                    <div className="text-xs text-fs-on-surface-variant transition-all duration-300">Sessions</div>
                                    <div className="text-lg font-semibold text-fs-on-surface transition-all duration-300">{completedWorkSessionsToday}</div>
                                </div>
                                <div className="bg-fs-surface-container-low rounded-lg p-3 backdrop-blur-sm transition-all duration-300 hover:bg-fs-surface-container-low-hover">
                                    <div className="text-xs text-fs-on-surface-variant transition-all duration-300">Focus Time</div>
                                    <div className="text-lg font-semibold text-fs-on-surface transition-all duration-300">{Math.floor((completedWorkSessionsToday * settings.durations.work) / 60)}m</div>
                                </div>
                            </div>
                        </ModernCard>
                        <ModernCard className="p-4">
                            <h3 className="text-sm font-semibold text-fs-on-surface-variant flex items-center gap-2 transition-all duration-300 mb-3">
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
                                    className="h-12 transition-all duration-300"
                                >
                                    View Stats
                                </ModernButton>
                                <ModernButton
                                    variant="glass"
                                    size="md"
                                    fullWidth
                                    onClick={openSettingsModal}
                                    icon={<span>⚙️</span>}
                                    className="h-12 transition-all duration-300"
                                >
                                    Settings
                                </ModernButton>
                            </div>
                        </ModernCard>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-fs-outline/30 transition-all duration-300 mt-auto">
                    <div className="flex items-center justify-between text-xs text-fs-on-surface-variant transition-all duration-300">
                        <div>
                            {new Date().toLocaleDateString(currentLang, { 
                                weekday: 'short', 
                                month: 'short', 
                                day: 'numeric' 
                            })}
                        </div>
                        <div className="flex items-center space-x-2">
                            <select
                                value={currentLang}
                                onChange={(e) => {
                                    setCurrentLang(e.target.value as Language);
                                    localStorage.setItem('language', e.target.value);
                                }}
                                className="text-xs bg-transparent border-none outline-none cursor-pointer text-fs-on-surface-variant hover:text-fs-primary transition-colors duration-200"
                            >
                                <option value="en">🇺🇸 EN</option>
                                <option value="es">🇪🇸 ES</option>
                                <option value="fr">🇫🇷 FR</option>
                                <option value="de">🇩🇪 DE</option>
                                <option value="zh">🇨🇳 中文</option>
                                <option value="ja">🇯🇵 日本</option>
                            </select>
                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="p-1 text-fs-on-surface-variant hover:text-fs-primary transition-colors duration-200"
                                aria-label={isDark ? t('theme.light', currentLang) : t('theme.dark', currentLang)}
                                title={isDark ? t('theme.light', currentLang) : t('theme.dark', currentLang)}
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
                            <span className="text-fs-on-surface-variant">v1.0.0</span>
                        </div>
                    </div>
                </div>

                <ApiKeySettingsModal isOpen={isSettingsModalOpen} onClose={closeSettingsModal} />
            </animated.div>
        </TooltipProvider>
    );
}

export default PopupView;