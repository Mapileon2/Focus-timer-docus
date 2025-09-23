import React, { useState, useEffect } from 'react';
import { cn } from '../../utils/design-system';
import { ModernCard } from './ModernCard';
import { ModernButton } from './ModernButton';
import { GlassMorphismCard } from './GlassMorphismCard';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';

interface TimerDurations {
  work: number;
  shortBreak: number;
  longBreak: number;
}

interface NotificationSettings {
  enabled: boolean;
  sound: boolean;
  desktop: boolean;
  soundUrl: string;
  volume: number;
}

interface ThemeSettings {
  mode: 'light' | 'dark' | 'auto';
  accentColor: string;
  backgroundStyle: 'minimal' | 'gradient' | 'pattern';
}

interface ModernSettingsPanelProps {
  durations: TimerDurations;
  notifications: NotificationSettings;
  theme: ThemeSettings;
  onDurationsChange: (durations: TimerDurations) => void;
  onNotificationsChange: (notifications: NotificationSettings) => void;
  onThemeChange: (theme: ThemeSettings) => void;
  onReset: () => void;
  onExport: () => void;
  onImport: (data: any) => void;
  className?: string;
}

export const ModernSettingsPanel: React.FC<ModernSettingsPanelProps> = ({
  durations,
  notifications,
  theme,
  onDurationsChange,
  onNotificationsChange,
  onThemeChange,
  onReset,
  onExport,
  onImport,
  className
}) => {
  const [activeTab, setActiveTab] = useState('timer');
  const [previewSound, setPreviewSound] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Track changes for save indication
  useEffect(() => {
    setHasChanges(true);
    const timer = setTimeout(() => setHasChanges(false), 2000);
    return () => clearTimeout(timer);
  }, [durations, notifications, theme]);

  const handleDurationChange = (type: keyof TimerDurations, value: number[]) => {
    onDurationsChange({
      ...durations,
      [type]: value[0] * 60 // Convert minutes to seconds
    });
  };

  const handleSoundPreview = () => {
    setPreviewSound(true);
    const audio = new Audio(notifications.soundUrl);
    audio.volume = notifications.volume / 100;
    audio.play().catch(() => {
      // Handle audio play error silently
    });
    setTimeout(() => setPreviewSound(false), 1000);
  };

  const soundOptions = [
    { label: 'Gentle Bell', value: 'https://cdn.pixabay.com/audio/2022/11/17/audio_835704c1f9.mp3' },
    { label: 'Digital Beep', value: 'https://cdn.pixabay.com/audio/2021/08/04/audio_12b0c74438.mp3' },
    { label: 'Soft Chime', value: 'https://cdn.pixabay.com/audio/2022/10/13/audio_7a3b47c94b.mp3' },
    { label: 'Nature Sound', value: 'https://cdn.pixabay.com/audio/2022/10/28/audio_363401d7a2.mp3' }
  ];

  const accentColors = [
    { label: 'Blue', value: '#4285F4', preview: 'bg-blue-500' },
    { label: 'Green', value: '#34A853', preview: 'bg-green-500' },
    { label: 'Purple', value: '#7E57C2', preview: 'bg-purple-500' },
    { label: 'Orange', value: '#FF9800', preview: 'bg-orange-500' },
    { label: 'Pink', value: '#E91E63', preview: 'bg-pink-500' },
    { label: 'Teal', value: '#009688', preview: 'bg-teal-500' }
  ];

  return (
    <GlassMorphismCard className={cn('p-6 max-w-2xl mx-auto', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Settings
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Customize your Focus & Smile experience
          </p>
        </div>
        
        {hasChanges && (
          <Badge variant="success" className="animate-pulse">
            <span className="mr-1">💾</span>
            Auto-saved
          </Badge>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="timer" className="flex items-center gap-2">
            <span>⏱️</span>
            Timer
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <span>🔔</span>
            Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <span>🎨</span>
            Appearance
          </TabsTrigger>
        </TabsList>

        {/* Timer Settings */}
        <TabsContent value="timer" className="space-y-6">
          <ModernCard variant="outlined" padding="lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>🎯</span>
              Session Durations
            </h3>
            
            <div className="space-y-6">
              {/* Work Duration */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="work-duration" className="text-sm font-medium">
                    Focus Session
                  </Label>
                  <Badge variant="outline" className="text-xs">
                    {Math.floor(durations.work / 60)} min
                  </Badge>
                </div>
                <Slider
                  id="work-duration"
                  min={5}
                  max={60}
                  step={5}
                  value={[Math.floor(durations.work / 60)]}
                  onValueChange={(value) => handleDurationChange('work', value)}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>5 min</span>
                  <span>60 min</span>
                </div>
              </div>

              <Separator />

              {/* Short Break Duration */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="short-break-duration" className="text-sm font-medium">
                    Short Break
                  </Label>
                  <Badge variant="outline" className="text-xs">
                    {Math.floor(durations.shortBreak / 60)} min
                  </Badge>
                </div>
                <Slider
                  id="short-break-duration"
                  min={1}
                  max={15}
                  step={1}
                  value={[Math.floor(durations.shortBreak / 60)]}
                  onValueChange={(value) => handleDurationChange('shortBreak', value)}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>1 min</span>
                  <span>15 min</span>
                </div>
              </div>

              <Separator />

              {/* Long Break Duration */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="long-break-duration" className="text-sm font-medium">
                    Long Break
                  </Label>
                  <Badge variant="outline" className="text-xs">
                    {Math.floor(durations.longBreak / 60)} min
                  </Badge>
                </div>
                <Slider
                  id="long-break-duration"
                  min={10}
                  max={45}
                  step={5}
                  value={[Math.floor(durations.longBreak / 60)]}
                  onValueChange={(value) => handleDurationChange('longBreak', value)}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>10 min</span>
                  <span>45 min</span>
                </div>
              </div>
            </div>
          </ModernCard>

          {/* Quick Presets */}
          <ModernCard variant="outlined" padding="lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>⚡</span>
              Quick Presets
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <ModernButton
                variant="ghost"
                onClick={() => onDurationsChange({ work: 25*60, shortBreak: 5*60, longBreak: 15*60 })}
                className="h-auto p-4 flex-col gap-2"
              >
                <span className="text-lg">🍅</span>
                <div className="text-center">
                  <div className="font-semibold text-sm">Classic</div>
                  <div className="text-xs text-slate-500">25/5/15 min</div>
                </div>
              </ModernButton>
              
              <ModernButton
                variant="ghost"
                onClick={() => onDurationsChange({ work: 50*60, shortBreak: 10*60, longBreak: 30*60 })}
                className="h-auto p-4 flex-col gap-2"
              >
                <span className="text-lg">🚀</span>
                <div className="text-center">
                  <div className="font-semibold text-sm">Extended</div>
                  <div className="text-xs text-slate-500">50/10/30 min</div>
                </div>
              </ModernButton>
              
              <ModernButton
                variant="ghost"
                onClick={() => onDurationsChange({ work: 15*60, shortBreak: 3*60, longBreak: 10*60 })}
                className="h-auto p-4 flex-col gap-2"
              >
                <span className="text-lg">⚡</span>
                <div className="text-center">
                  <div className="font-semibold text-sm">Quick</div>
                  <div className="text-xs text-slate-500">15/3/10 min</div>
                </div>
              </ModernButton>
              
              <ModernButton
                variant="ghost"
                onClick={() => onDurationsChange({ work: 45*60, shortBreak: 15*60, longBreak: 45*60 })}
                className="h-auto p-4 flex-col gap-2"
              >
                <span className="text-lg">🧘</span>
                <div className="text-center">
                  <div className="font-semibold text-sm">Mindful</div>
                  <div className="text-xs text-slate-500">45/15/45 min</div>
                </div>
              </ModernButton>
            </div>
          </ModernCard>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <ModernCard variant="outlined" padding="lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>🔔</span>
              Notification Preferences
            </h3>
            
            <div className="space-y-6">
              {/* Enable Notifications */}
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Enable Notifications</Label>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Receive alerts when sessions complete
                  </p>
                </div>
                <Switch
                  checked={notifications.enabled}
                  onCheckedChange={(checked) => 
                    onNotificationsChange({ ...notifications, enabled: checked })
                  }
                />
              </div>

              <Separator />

              {/* Sound Notifications */}
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Sound Alerts</Label>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Play sound when timer completes
                  </p>
                </div>
                <Switch
                  checked={notifications.sound}
                  onCheckedChange={(checked) => 
                    onNotificationsChange({ ...notifications, sound: checked })
                  }
                  disabled={!notifications.enabled}
                />
              </div>

              {/* Sound Selection */}
              {notifications.sound && (
                <div className="space-y-3 pl-4 border-l-2 border-slate-200 dark:border-slate-700">
                  <Label className="text-sm font-medium">Notification Sound</Label>
                  <div className="flex items-center gap-3">
                    <Select
                      value={notifications.soundUrl}
                      onValueChange={(value) => 
                        onNotificationsChange({ ...notifications, soundUrl: value })
                      }
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Choose sound" />
                      </SelectTrigger>
                      <SelectContent>
                        {soundOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <ModernButton
                      variant="ghost"
                      size="sm"
                      onClick={handleSoundPreview}
                      disabled={previewSound}
                      className="px-3"
                    >
                      {previewSound ? '🔊' : '🎵'}
                    </ModernButton>
                  </div>

                  {/* Volume Control */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Volume</Label>
                      <Badge variant="outline" className="text-xs">
                        {notifications.volume}%
                      </Badge>
                    </div>
                    <Slider
                      min={0}
                      max={100}
                      step={10}
                      value={[notifications.volume]}
                      onValueChange={(value) => 
                        onNotificationsChange({ ...notifications, volume: value[0] })
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              )}

              <Separator />

              {/* Desktop Notifications */}
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Desktop Notifications</Label>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Show system notifications
                  </p>
                </div>
                <Switch
                  checked={notifications.desktop}
                  onCheckedChange={(checked) => 
                    onNotificationsChange({ ...notifications, desktop: checked })
                  }
                  disabled={!notifications.enabled}
                />
              </div>
            </div>
          </ModernCard>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <ModernCard variant="outlined" padding="lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>🎨</span>
              Theme & Appearance
            </h3>
            
            <div className="space-y-6">
              {/* Theme Mode */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Theme Mode</Label>
                <div className="grid grid-cols-3 gap-3">
                  {(['light', 'dark', 'auto'] as const).map((mode) => (
                    <ModernButton
                      key={mode}
                      variant={theme.mode === mode ? 'primary' : 'ghost'}
                      onClick={() => onThemeChange({ ...theme, mode })}
                      className="h-auto p-4 flex-col gap-2"
                    >
                      <span className="text-lg">
                        {mode === 'light' ? '☀️' : mode === 'dark' ? '🌙' : '🔄'}
                      </span>
                      <span className="text-xs capitalize">{mode}</span>
                    </ModernButton>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Accent Color */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Accent Color</Label>
                <div className="grid grid-cols-6 gap-2">
                  {accentColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => onThemeChange({ ...theme, accentColor: color.value })}
                      className={cn(
                        'w-10 h-10 rounded-full border-2 transition-all duration-200',
                        color.preview,
                        theme.accentColor === color.value 
                          ? 'border-slate-900 dark:border-slate-100 scale-110 shadow-lg' 
                          : 'border-slate-300 dark:border-slate-600 hover:scale-105'
                      )}
                      aria-label={`Select ${color.label} accent color`}
                    />
                  ))}
                </div>
              </div>

              <Separator />

              {/* Background Style */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Background Style</Label>
                <div className="grid grid-cols-3 gap-3">
                  {(['minimal', 'gradient', 'pattern'] as const).map((style) => (
                    <ModernButton
                      key={style}
                      variant={theme.backgroundStyle === style ? 'primary' : 'ghost'}
                      onClick={() => onThemeChange({ ...theme, backgroundStyle: style })}
                      className="h-auto p-4 flex-col gap-2"
                    >
                      <span className="text-lg">
                        {style === 'minimal' ? '⬜' : style === 'gradient' ? '🌈' : '🔷'}
                      </span>
                      <span className="text-xs capitalize">{style}</span>
                    </ModernButton>
                  ))}
                </div>
              </div>
            </div>
          </ModernCard>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <ModernButton
            variant="ghost"
            size="sm"
            onClick={onExport}
            className="gap-2"
          >
            <span>📤</span>
            Export Settings
          </ModernButton>
          
          <ModernButton
            variant="ghost"
            size="sm"
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = '.json';
              input.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    try {
                      const data = JSON.parse(e.target?.result as string);
                      onImport(data);
                    } catch (error) {
                      console.error('Failed to import settings:', error);
                    }
                  };
                  reader.readAsText(file);
                }
              };
              input.click();
            }}
            className="gap-2"
          >
            <span>📥</span>
            Import Settings
          </ModernButton>
        </div>

        <ModernButton
          variant="secondary"
          size="sm"
          onClick={() => {
            if (confirm('Reset all settings to default values?')) {
              onReset();
            }
          }}
          className="gap-2"
        >
          <span>🔄</span>
          Reset to Defaults
        </ModernButton>
      </div>
    </GlassMorphismCard>
  );
};

export default ModernSettingsPanel;