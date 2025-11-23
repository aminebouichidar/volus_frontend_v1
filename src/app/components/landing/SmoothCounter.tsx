import React, { useState, useEffect, useRef } from 'react';

interface SmoothCounterProps {
  targetValue: number;
  duration?: number;
}

const SmoothCounter: React.FC<SmoothCounterProps> = ({ targetValue, duration = 1000 }) => {
  const [displayValue, setDisplayValue] = useState<number>(100);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const startValueRef = useRef<number>(0);

  useEffect(() => {
    startValueRef.current = displayValue;
    startTimeRef.current = null;

    const animate = (timestamp: number): void => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth easing function
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = startValueRef.current + (targetValue - startValueRef.current) * easeOutCubic;
      setDisplayValue(Math.floor(currentValue));
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetValue, duration, displayValue]);

  return <span>{displayValue.toLocaleString()}</span>;
};

export default SmoothCounter;