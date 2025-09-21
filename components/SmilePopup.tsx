import React, { useState, useEffect } from 'react';
import { useTimer } from '../hooks/useTimer';
import { useQuotes } from '../hooks/useQuotes';
import { useAppSettings } from '../hooks/useAppSettings';
import { Quote } from '../types';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader } from './ui/card';
import { Skeleton } from './ui/skeleton';
import Spinner from './ui/Spinner';
import { CelebrationEffects } from './enhanced/CelebrationEffects';

const SmilePopup = () => {
    const { showSmilePopup, confirmSmileAndProceed, timerState } = useTimer();
    const { getContextualQuote, recordSmileUsage } = useQuotes();
    const { settings } = useAppSettings();
    const [quote, setQuote] = useState<Quote | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (showSmilePopup) {
            setIsLoading(true);
            getContextualQuote(timerState.sessionType)
                .then(q => {
                    setQuote(q);
                    setIsLoading(false);
                })
                .catch(() => {
                    // Fallback handled inside getContextualQuote
                    setIsLoading(false);
                });
        }
    }, [showSmilePopup, getContextualQuote, timerState.sessionType]);

    if (!showSmilePopup) {
        return null;
    }

    const handleAction = (type: 'smile' | 'skip') => {
        if (quote) {
            recordSmileUsage({
                quoteId: quote.id,
                sessionType: timerState.sessionType,
                sessionCount: timerState.sessionCount,
                type
            });
        }
        confirmSmileAndProceed();
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in-0 duration-300">
            {/* Celebration Effects */}
            <CelebrationEffects 
                isVisible={showSmilePopup} 
                sessionType={timerState.sessionType}
            />
            
            <Card className="max-w-md w-full text-center shadow-2xl border-0 bg-white dark:bg-gray-950 animate-in zoom-in-95 duration-300 relative z-10">
                <CardHeader className="pb-6">
                    {settings.customSmileImage && (
                        <div className="mb-6">
                            <img 
                                src={settings.customSmileImage} 
                                alt="Custom motivation" 
                                className="max-h-40 w-auto mx-auto rounded-xl shadow-lg"
                            />
                        </div>
                    )}
                    
                    <div className="space-y-4">
                        <div className="flex items-center justify-center">
                            <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium shadow-lg animate-pulse">
                                🎉 Session Complete!
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                            Time's Up!
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Take a moment to smile and recharge 😊
                        </p>
                    </div>
                </CardHeader>

                <CardContent className="space-y-6">
                    {isLoading ? (
                        <div className="space-y-4 py-8">
                            <div className="flex justify-center">
                                <Spinner />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-3 w-3/4 mx-auto bg-gray-200 dark:bg-gray-700" />
                                <Skeleton className="h-3 w-1/2 mx-auto bg-gray-200 dark:bg-gray-700" />
                            </div>
                        </div>
                    ) : quote ? (
                        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                            <blockquote className="text-lg leading-relaxed text-gray-900 dark:text-gray-100 font-medium italic">
                                "{quote.text}"
                            </blockquote>
                            <cite className="block text-right mt-4 not-italic text-gray-600 dark:text-gray-400 font-medium">
                                — {quote.author}
                            </cite>
                        </div>
                    ) : null}
                    
                    <div className="flex justify-center gap-3 pt-4">
                        <Button 
                            onClick={() => handleAction('skip')} 
                            variant="outline" 
                            size="lg"
                            className="gap-2 border-fs-outline text-fs-on-surface-variant hover:bg-fs-surface-container-high hover:text-fs-on-surface"
                        >
                            <span>⏭️</span>
                            Skip Break
                        </Button>
                        <Button 
                            onClick={() => handleAction('smile')} 
                            size="lg"
                            className="gap-2 bg-fs-primary text-fs-on-primary hover:bg-fs-primary/90 shadow-lg shadow-fs-primary/25 hover:shadow-xl hover:scale-105 transition-all duration-200"
                        >
                            <span>☕</span>
                            Start Break
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SmilePopup;