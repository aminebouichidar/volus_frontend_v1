"use client";

import { useState, useEffect } from "react";

interface AnimatedStatProps {
  label: string;
  targetValue: string;
}

export function AnimatedStat({ label, targetValue }: AnimatedStatProps) {
  const [displayValue, setDisplayValue] = useState(targetValue);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        // Small random variation for live feel
        const baseNum = parseFloat(targetValue);
        if (!isNaN(baseNum)) {
          const variation = (Math.random() - 0.5) * 0.1;
          setDisplayValue((baseNum + variation).toFixed(1) + (targetValue.includes("M") ? "M" : "%"));
        }
        setIsVisible(true);
      }, 200);
    }, 3000);

    return () => clearInterval(interval);
  }, [targetValue]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5 backdrop-blur">
      <div
        className={`text-2xl font-semibold text-indigo-200 transition-all duration-300 ${
          isVisible ? "opacity-100 scale-100" : "opacity-50 scale-95"
        }`}
      >
        {displayValue}
      </div>
      <p className="text-sm uppercase tracking-wide text-gray-400">{label}</p>
    </div>
  );
}
