import React, { useState, useEffect } from 'react';
import { cn } from '../../utils/design-system';
import { ModernCard } from './ModernCard';
import { GlassMorphismCard } from './GlassMorphismCard';
import { ModernStatsCard } from './ModernStatsCard';
import { ModernNavigation } from './ModernNavigation';
import { EnhancedCircularTimer } from './EnhancedCircularTimer';
import { EnhancedQuoteSystem } from './EnhancedQuoteSystem';
import { SmartNotificationSystem, useSmartNotifications } from './SmartNotificationSystem';
import { ModernButton } from './ModernButton';
import { Badge } from '../ui/badge';
import { useTimer } from '../../hooks/useTimer';
import { useQuotes } from '../../hooks/useQuotes';
import { useApiKey } from '../../hooks/useApiKey';

interface ModernDashboardProps {
  className?: string;
}

export const ModernDashboard: React.FC<ModernDashboardProps> = ({ className }) => {
  const [activeSection, setActiveSection] = useState('timer');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { 
    timerState, 
    isActive, 
    startTimer, 
    pauseTimer, 
    resetTimer, 
    skipSession, 
    settings,
    completedWorkSessionsToday,
    totalFocusTimeToday,
    currentStreak,
    productivity
  } = useTimer();
  const { quotes, generateAndAddQuotes, toggleFavorite, deleteQuote } = useQuotes();
  const { isKeySet, openSettingsModal } = useApiKey();
  const { notifications, dismissNotification, addNotification } = useSmartNotifications();

  // Navigation items
  const navigationItems = [
    {
      id: 'timer',
      label: 'Timer',
      icon: <span>⏱️</span>,
      status: isActive ? 'active' as const : 'inactive' as const
    },
    {
      id: 'quotes',
      label: 'Quotes',
      icon: <span>💭</span>,
      badge: quotes.filter(q => q.isFavorite).length || undefined
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <span>📊</span>,
      status: completedWorkSessionsToday > 0 ? 'new' as const : 'inactive' as const
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <span>⚙️</span>,
      status: !isKeySet ? 'warning' as const : 'inactive' as const
    }
  ];

  // Stats for analytics section
  const analyticsStats = [
    {
      label: 'Focus Time',
      value: Math.floor(totalFocusTimeToday / 60),
      unit: 'min',
      icon: '⏱️',
      trend: 'up' as const,
      trendValue: 15,
      target: 480, // 8 hours
      description: 'Total focused work time today'
    },
    {
      label: 'Sessions',
      value: completedWorkSessionsToday,
      icon: '🎯',
      trend: 'up' as const,
      trendValue: 8,
      target: 12,
      description: 'Completed focus sessions today'
    },
    {
      label: 'Streak',
      value: currentStreak,
      icon: '🔥',
      trend: currentStreak > 0 ? 'up' as const : 'neutral' as const,
      trendValue: currentStreak,
      description: 'Current consecutive sessions'
    },
    {
      label: 'Productivity',
      value: productivity,
      unit: '%',
      icon: '📈',
      trend: productivity >= 80 ? 'up' as const : productivity >= 60 ? 'neutral' as const : 'down' as const,
      trendValue: productivity,
      target: 100,
      description: 'Session completion rate'
    }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'timer':
        return (
          <div className="space-y-6">
            {/* Main Timer */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <GlassMorphismCard className="p-8 text-center">
                  <EnhancedCircularTimer
                    timerState={timerState}
                    isActive={isActive}
                    settings={settings}
                    size={320}
                    variant="glass"
                    showSessionInfo={true}
                  />
                </GlassMorphismCard>
              </div>
              
              {/* Quick Stats */}
              <div className="space-y-4">
                <ModernStatsCard
                  title="Today's Progress"
                  stats={analyticsStats.slice(0, 2)}
                  variant="glass"
                  layout="list"
                  showProgress={true}
                  progressValue={(completedWorkSessionsToday / 12) * 100}
                />
                
                <ModernCard variant="glass" padding="lg">
                  <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <ModernButton
                      variant="primary"
                      fullWidth
                      onClick={() => setActiveSection('quotes')}
                      icon={<span>💭</span>}
                    >
                      Browse Quotes
                    </ModernButton>
                    <ModernButton
                      variant="secondary"
                      fullWidth
                      onClick={() => setActiveSection('analytics')}
                      icon={<span>📊</span>}
                    >
                      View Analytics
                    </ModernButton>
                  </div>
                </ModernCard>
              </div>
            </div>
          </div>
        );

      case 'quotes':
        return (
          <EnhancedQuoteSystem
            quotes={quotes}
            onQuoteSelect={(quote) => {
              addNotification({
                title: 'Quote Selected',
                message: `"${quote.content.slice(0, 50)}..."`,
                type: 'info',
                duration: 3000
              });
            }}
            onQuoteGenerate={generateAndAddQuotes}
            onQuoteFavorite={toggleFavorite}
            onQuoteDelete={deleteQuote}
            sessionType={timerState.sessionType}
          />
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <ModernStatsCard
              title="Performance Analytics"
              stats={analyticsStats}
              variant="gradient"
              layout="grid"
              showProgress={true}
              progressValue={(completedWorkSessionsToday / 12) * 100}
              interactive={true}
              onStatClick={(stat) => {
                addNotification({
                  title: stat.label,
                  message: stat.description || `Current value: ${stat.value}${stat.unit || ''}`,
                  type: 'info',
                  duration: 4000
                });
              }}
            />
            
            {/* Weekly Overview */}
            <GlassMorphismCard className="p-6">
              <h3 className="text-lg font-semibold mb-4">Weekly Overview</h3>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                  <div key={day} className="text-center">
                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">{day}</div>
                    <div className={cn(
                      'h-16 rounded-lg transition-all duration-200 hover:scale-105',
                      index === new Date().getDay() - 1 
                        ? 'bg-blue-500 text-white shadow-lg' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    )}>
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="text-lg font-bold">
                          {index === new Date().getDay() - 1 ? completedWorkSessionsToday : Math.floor(Math.random() * 8)}
                        </div>
                        <div className="text-xs">sessions</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassMorphismCard>
          </div>
        );

      case 'settings':
        return (
          <GlassMorphismCard className="p-6">
            <h3 className="text-lg font-semibold mb-4">Settings</h3>
            <div className="space-y-4">
              <ModernButton
                variant="outline"
                fullWidth
                onClick={openSettingsModal}
                icon={<span>🔑</span>}
              >
                Configure API Key
              </ModernButton>
              
              {!isKeySet && (
                <div className="p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/30 rounded-lg">
                  <p className="text-sm text-orange-800 dark:text-orange-200">
                    API key required for AI features
                  </p>
                </div>
              )}
            </div>
          </GlassMorphismCard>
        );

      default:
        return null;
    }
  };

  return (
    <div className={cn(
      'min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100',
      'dark:from-slate-950 dark:via-slate-900 dark:to-slate-800',
      'transition-all duration-500',
      className
    )}>
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img src="/icons/icon48.png" alt="Focus Smile" className="w-12 h-12 rounded-xl shadow-lg" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Focus & Smile
                </h1>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">v3.0</Badge>
                  <Badge variant="outline" className="text-xs">Dashboard</Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <ModernButton
                variant="ghost"
                size="sm"
                onClick={() => setIsCollapsed(!isCollapsed)}
                icon={<span>{isCollapsed ? '📖' : '📑'}</span>}
              >
                {isCollapsed ? 'Expand' : 'Collapse'}
              </ModernButton>
              
              <ModernButton
                variant="primary"
                size="sm"
                onClick={openSettingsModal}
                icon={<span>⚙️</span>}
              >
                Settings
              </ModernButton>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className={cn(
          'transition-all duration-300 ease-out',
          isCollapsed ? 'w-20' : 'w-64',
          'min-h-screen bg-white/30 dark:bg-slate-900/30 backdrop-blur-md',
          'border-r border-slate-200/50 dark:border-slate-700/50'
        )}>
          <div className="p-4">
            <ModernNavigation
              items={navigationItems}
              activeItem={activeSection}
              onItemChange={setActiveSection}
              variant="rail"
              orientation="vertical"
              showLabels={!isCollapsed}
              compact={isCollapsed}
            />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {renderActiveSection()}
          </div>
        </main>
      </div>

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

export default ModernDashboard;