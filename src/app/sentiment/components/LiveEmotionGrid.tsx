"use client";

import { useState, useEffect } from "react";

const emotions = ["Delight", "Trust", "Concern", "Joy", "Frustration", "Anticipation"];
const initialValues = [85, 78, 65, 92, 58, 73]; // Static initial values

export function LiveEmotionGrid() {
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    // Start with random values after mount to avoid hydration mismatch
    setValues(emotions.map(() => Math.floor(Math.random() * 35) + 60));

    const interval = setInterval(() => {
      setValues((prev) =>
        prev.map((val) => {
          const change = Math.floor(Math.random() * 7) - 3;
          return Math.max(50, Math.min(95, val + change));
        })
      );
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-4 grid grid-cols-3 gap-3 text-center">
      {emotions.map((emo, idx) => (
        <div
          key={emo}
          className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent py-4 transition-all duration-500 hover:scale-105 hover:border-indigo-400/30"
        >
          <div className="text-sm font-medium text-white">{emo}</div>
          <div className="text-xs text-indigo-200 transition-all duration-700">
            {values[idx]}%
          </div>
        </div>
      ))}
    </div>
  );
}
