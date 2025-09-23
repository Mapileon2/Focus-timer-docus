import React, { useEffect, useRef, useCallback } from 'react';

interface PrecisionTimerProps {
  duration: number; // in seconds
  isActive: boolean;
  onTick: (remainingSeconds: number) => void;
  onComplete: () => void;
  onStart?: () => void;
  onPause?: () => void;
}

/**
 * High-precision timer component that prevents drift using performance.now()
 * and handles background execution properly for Chrome extensions
 */
export const PrecisionTimer: React.FC<PrecisionTimerProps> = ({
  duration,
  isActive,
  onTick,
  onComplete,
  onStart,
  onPause
}) => {
  const startTimeRef = useRef<number | null>(null);
  const expectedEndTimeRef = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTickRef = useRef<number>(0);

  // High-precision tick function using performance.now()
  const tick = useCallback(() => {
    if (!startTimeRef.current) return;

    const now = performance.now();
    const elapsed = now - startTimeRef.current;
    const remaining = Math.max(0, duration * 1000 - elapsed);
    const remainingSeconds = Math.ceil(remaining / 1000);

    // Only call onTick if the second has actually changed
    if (remainingSeconds !== lastTickRef.current) {
      lastTickRef.current = remainingSeconds;
      onTick(remainingSeconds);
    }

    if (remaining <= 0) {
      // Timer completed
      startTimeRef.current = null;
      onComplete();
    } else {
      // Schedule next tick
      animationFrameRef.current = requestAnimationFrame(tick);
    }
  }, [duration, onTick, onComplete]);

  // Start timer
  const startTimer = useCallback(() => {
    if (startTimeRef.current) return; // Already running

    startTimeRef.current = performance.now();
    expectedEndTimeRef.current = startTimeRef.current + (duration * 1000);
    lastTickRef.current = duration;
    
    onStart?.();
    tick();
  }, [duration, onStart, tick]);

  // Pause timer
  const pauseTimer = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    startTimeRef.current = null;
    onPause?.();
  }, [onPause]);

  // Reset timer
  const resetTimer = useCallback(() => {
    pauseTimer();
    lastTickRef.current = duration;
    onTick(duration);
  }, [duration, onTick, pauseTimer]);

  // Handle active state changes
  useEffect(() => {
    if (isActive) {
      startTimer();
    } else {
      pauseTimer();
    }

    return () => {
      pauseTimer();
    };
  }, [isActive, startTimer, pauseTimer]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Handle visibility change (when tab becomes hidden/visible)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isActive) {
        // Tab became hidden, switch to interval-based timing for background accuracy
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
        
        intervalRef.current = setInterval(() => {
          tick();
        }, 100); // Check every 100ms for better accuracy
      } else if (!document.hidden && isActive) {
        // Tab became visible, switch back to requestAnimationFrame
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        
        tick();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isActive, tick]);

  return null; // This is a logic-only component
};

export default PrecisionTimer;