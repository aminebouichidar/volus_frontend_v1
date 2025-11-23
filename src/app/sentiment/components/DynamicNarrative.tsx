"use client";

import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

const aiNarratives = [
  {
    text: "Gen Z buyers celebrate the new drop but cite supply concerns in Europe.",
    badge: "Streetwear pulse",
    metric: "+12 net delight",
    gradient:
      "linear-gradient(135deg, rgba(129,140,248,0.35), rgba(236,72,153,0.25))",
  },
  {
    text: "Creators in LATAM are requesting deeper specs before recommending bundles.",
    badge: "Creator chatter",
    metric: "Intent +8",
    gradient:
      "linear-gradient(135deg, rgba(16,185,129,0.35), rgba(14,165,233,0.25))",
  },
  {
    text: "Warranty claims dipped 18% after the sustainability video hit...",
    badge: "Ops x Sentiment",
    metric: "Trust +5",
    gradient:
      "linear-gradient(135deg, rgba(251,146,60,0.35), rgba(147,51,234,0.25))",
  },
];

export function DynamicNarrative() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % aiNarratives.length);
        setIsAnimating(false);
      }, 300);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const currentNarrative = aiNarratives[currentIndex];

  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-4">
      <div className="relative overflow-hidden rounded-xl border border-white/5 bg-black/40 p-4">
        <div
          className="absolute inset-0 opacity-70 transition-all duration-700"
          style={{ background: currentNarrative.gradient }}
        />
        <div
          className={`relative flex flex-col gap-3 transition-all duration-300 ${
            isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
          }`}
        >
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-white/70">
            <Sparkles className="w-4 h-4 text-indigo-200" />
            {currentNarrative.badge}
          </div>
          <p className="text-sm text-gray-50 leading-relaxed">
            AI narrative: {currentNarrative.text}
          </p>
          <div className="text-xs text-indigo-100">
            Pulse delta: {currentNarrative.metric}
          </div>
        </div>
        <div className="absolute bottom-2 right-2 flex gap-1.5">
          {aiNarratives.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 w-1 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "bg-indigo-300 w-4" : "bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
