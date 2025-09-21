import React, { useEffect, useRef } from 'react';
import { Confetti, ConfettiRef } from '../magicui/confetti';

interface CelebrationEffectsProps {
  isVisible: boolean;
  sessionType: string;
  onComplete?: () => void;
}

export const CelebrationEffects: React.FC<CelebrationEffectsProps> = ({
  isVisible,
  sessionType,
  onComplete,
}) => {
  const confettiRef = useRef<ConfettiRef>(null);

  const getSessionColors = (type: string) => {
    switch (type) {
      case 'work':
        return ['#3B82F6', '#1D4ED8', '#60A5FA', '#93C5FD'];
      case 'shortBreak':
        return ['#10B981', '#059669', '#34D399', '#6EE7B7'];
      case 'longBreak':
        return ['#8B5CF6', '#7C3AED', '#A78BFA', '#C4B5FD'];
      default:
        return ['#6B7280', '#4B5563', '#9CA3AF', '#D1D5DB'];
    }
  };

  const colors = getSessionColors(sessionType);

  useEffect(() => {
    if (isVisible && confettiRef.current) {
      // Initial burst
      confettiRef.current.fire({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: colors,
      });

      // Side cannons
      setTimeout(() => {
        confettiRef.current?.fire({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confettiRef.current?.fire({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });
      }, 250);

      // Final burst
      setTimeout(() => {
        confettiRef.current?.fire({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.7 },
          colors: colors,
          shapes: ['star', 'circle'],
        });
        
        // Call onComplete after all effects
        setTimeout(() => {
          onComplete?.();
        }, 1000);
      }, 500);
    }
  }, [isVisible, colors, onComplete]);

  if (!isVisible) return null;

  return (
    <Confetti
      ref={confettiRef}
      className="absolute inset-0 z-50 pointer-events-none"
      manualstart={true}
      options={{
        particleCount: 0, // We'll control this manually
        colors: colors,
      }}
    />
  );
};