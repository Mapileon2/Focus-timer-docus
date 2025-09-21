import React, { useState, useEffect } from 'react';
import TimerSection from './TimerSection';
import QuoteSection from './QuoteSection';
import SessionRecap from './SessionRecap';
import SmilePopup from './SmilePopup';
import ApiKeySettingsModal from './ApiKeySettingsModal';
import { useApiKey } from '../hooks/useApiKey';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { EnhancedCircularTimer } from './modern-ui/EnhancedCircularTimer';
import { Separator } from './ui/separator';
import { useTimer } from '../hooks/useTimer';
import { useSettings } from '../hooks/useSettings';
import {
  Timer,
  Quote,
  BarChart3,
  Settings,
  Key,
  Play,
  Pause,
  StopCircle,
  ChevronRight,
  Moon,
  Sun,
  Bell,
  User,
  Calendar,
  Clock,
  Smile
} from 'lucide-react';

interface SettingsSectionProps {
  isKeySet: boolean;
  openSettingsModal: () => void;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ isKeySet, openSettingsModal }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Notifications</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Session Reminders</p>
            <p className="text-xs text-muted-foreground">Receive notifications for scheduled sessions</p>
          </div>
          <Switch />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Quote of the Day</p>
            <p className="text-xs text-muted-foreground">Daily motivational quotes</p>
          </div>
          <Switch defaultChecked />
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Timer Settings</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Sound Alerts</p>
            <p className="text-xs text-muted-foreground">Play sound when timer completes</p>
          </div>
          <Switch defaultChecked />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Auto-start Breaks</p>
            <p className="text-xs text-muted-foreground">Automatically start break after focus session</p>
          </div>
          <Switch />
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">API Configuration</h3>
        <Button variant="outline" className="w-full flex items-center justify-between" onClick={openSettingsModal}>
          <span>Configure API Key</span>
          <Key className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

const FullAppView = () => {
    const { isKeySet, openSettingsModal, isSettingsModalOpen, closeSettingsModal } = useApiKey();
    const [isDark, setIsDark] = useState(false);
    const [activeTab, setActiveTab] = useState('timer');
    const { timerState, isActive, settings } = useTimer();
    
    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);
        
        // Check URL hash for initial tab
        const hash = window.location.hash.replace('#', '');
        if (hash && ['timer', 'quotes', 'statistics', 'settings'].includes(hash)) {
            setActiveTab(hash);
        }
    }, [isDark]);

    // Update URL hash when tab changes
    useEffect(() => {
        window.location.hash = activeTab;
    }, [activeTab]);

    const handleTabChange = (value: string) => {
        setActiveTab(value);
    };

    return (
        <div className="bg-background text-foreground min-h-screen font-sans flex flex-col">
            <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <img src="/icons/icon48.png" alt="Focus Smile Logo" className="w-10 h-10 rounded-xl shadow-sm"/>
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse"></div>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                                Focus & Smile
                            </h1>
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="text-xs">
                                    v2.2
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                    Dashboard
                                </Badge>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full"
                          aria-label="Notifications"
                        >
                          <Bell className="h-5 w-5" />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full"
                          aria-label="User profile"
                        >
                          <User className="h-5 w-5" />
                        </Button>
                        
                        <Button
                          onClick={openSettingsModal}
                          variant="outline"
                          size="sm"
                          className="gap-2"
                        >
                          <Settings className="w-4 h-4" /> Settings
                        </Button>
                        
                        <div className="flex items-center gap-2">
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => setIsDark(!isDark)}
                                className="rounded-full"
                            >
                                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container py-6 flex-grow">

                {!isKeySet && (
                    <Alert variant="destructive" className="mb-6">
                        <Key className="h-4 w-4" />
                        <AlertTitle>API Key Required</AlertTitle>
                        <AlertDescription>
                            Please set your Google Gemini API key in the settings to enable AI-powered features.
                            <Button variant="outline" size="sm" className="ml-2 mt-2" onClick={openSettingsModal}>
                                Configure Now
                            </Button>
                        </AlertDescription>
                    </Alert>
                )}
                
                <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                    <TabsList className="grid w-full grid-cols-4 mb-6">
                        <TabsTrigger value="timer" className="flex items-center gap-2">
                            <Timer className="w-4 h-4" /> Timer
                        </TabsTrigger>
                        <TabsTrigger value="quotes" className="flex items-center gap-2">
                            <Quote className="w-4 h-4" /> Quotes
                        </TabsTrigger>
                        <TabsTrigger value="statistics" className="flex items-center gap-2">
                            <BarChart3 className="w-4 h-4" /> Statistics
                        </TabsTrigger>
                        <TabsTrigger value="settings" className="flex items-center gap-2">
                            <Settings className="w-4 h-4" /> Settings
                        </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="timer" className="animate-in fade-in-50 duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card className="md:col-span-2">
                                <CardHeader>
                                    <CardTitle>Focus Timer</CardTitle>
                                    <CardDescription>Track your productivity sessions</CardDescription>
                                </CardHeader>
                                <CardContent className="flex justify-center py-6">
                                    <EnhancedCircularTimer timerState={timerState} isActive={isActive} settings={settings} />
                                </CardContent>
                            </Card>
                            
                            <Card>
                                <CardHeader>
                                    <CardTitle>Session Summary</CardTitle>
                                    <CardDescription>Insights from your recent focus sessions</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm font-medium">Total Focus Time</span>
                                        </div>
                                        <span className="font-bold">2h 15m</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm font-medium">Completed Sessions</span>
                                        </div>
                                        <span className="font-bold">4</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <Smile className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm font-medium">Smile Breaks</span>
                                        </div>
                                        <span className="font-bold">3</span>
                                    </div>
                                </CardContent>
                            </Card>
                                
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle>Quick Settings</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium">Focus Duration</span>
                                        <Badge>25 min</Badge>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium">Break Duration</span>
                                        <Badge variant="outline">5 min</Badge>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium">Sound Alerts</span>
                                        <Switch defaultChecked />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                    
                    <TabsContent value="quotes" className="animate-in fade-in-50 duration-300">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <Card className="lg:col-span-2">
                                <CardHeader>
                                    <CardTitle>Inspirational Quotes</CardTitle>
                                    <CardDescription>Curated quotes to boost your motivation</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <QuoteSection />
                                </CardContent>
                            </Card>
                            
                            <Card>
                                <CardHeader>
                                    <CardTitle>AI Quote Generator</CardTitle>
                                    <CardDescription>Generate personalized quotes</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {isKeySet ? (
                                        <div className="space-y-4">
                                            <p className="text-sm">Generate quotes based on your preferences and mood.</p>
                                            <Button className="w-full">Generate New Quote</Button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-6 text-center">
                                            <Key className="h-12 w-12 text-muted-foreground mb-4" />
                                            <p className="text-sm text-muted-foreground mb-2">API key required for this feature</p>
                                            <Button variant="outline" size="sm" onClick={openSettingsModal}>
                                                Configure API Key
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                    
                    <TabsContent value="statistics" className="animate-in fade-in-50 duration-300">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Focus Analytics</CardTitle>
                                    <CardDescription>Your productivity insights</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <SessionRecap />
                                </CardContent>
                            </Card>
                            
                            <Card>
                                <CardHeader>
                                    <CardTitle>Weekly Overview</CardTitle>
                                    <CardDescription>Your focus trends over time</CardDescription>
                                </CardHeader>
                                <CardContent className="h-[300px] flex items-center justify-center">
                                    <div className="text-center space-y-4">
                                        <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Detailed statistics will appear here as you complete more sessions</p>
                                            <Button variant="link" className="mt-2">
                                                Learn more <ChevronRight className="h-4 w-4 ml-1" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                    
                    <TabsContent value="settings" className="animate-in fade-in-50 duration-300">
                        <div className="grid grid-cols-1 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Application Settings</CardTitle>
                                    <CardDescription>Configure your Focus & Smile experience</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <SettingsSection isKeySet={isKeySet} openSettingsModal={openSettingsModal} />
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </main>

            <SmilePopup 
                isOpen={false} // SmilePopup should have its own state or be triggered by specific events
                onClose={() => {}} 
                onConfirm={() => { /* handle API key confirmation */ }} 
            />
            {isSettingsModalOpen && (
                <ApiKeySettingsModal 
                    isOpen={isSettingsModalOpen} 
                    onClose={closeSettingsModal} 
                    onSave={() => { /* handle API key save */ closeSettingsModal(); }} 
                />
            )}
        </div>
    );
};

export default FullAppView;