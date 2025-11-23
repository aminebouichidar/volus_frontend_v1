import React from "react";
import { cn } from "@/lib/utils";

interface FlippingCardProps {
  className?: string;
  height?: number;
  width?: number;
  frontContent?: React.ReactNode;
  backContent?: React.ReactNode;
}

export function FlippingCard({
  className,
  frontContent,
  backContent,
  height = 300,
  width = 350,
}: FlippingCardProps) {
  return (
    <div
      className="group/flipping-card"
      style={
        {
          perspective: "1000px",
          height: `${height}px`,
          width: `${width}px`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover/flipping-card:[transform:rotateY(180deg)]",
          className
        )}
      >
        {/* Front Face */}
        <div 
          className="absolute inset-0 h-full w-full rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] text-white shadow-2xl backdrop-blur-xl"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          {frontContent}
        </div>
        {/* Back Face */}
        <div 
          className="absolute inset-0 h-full w-full rounded-xl border border-white/10 bg-gradient-to-br from-indigo-900/60 via-purple-900/40 to-black text-white shadow-2xl backdrop-blur-xl"
          style={{ 
            backfaceVisibility: "hidden", 
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          {backContent}
        </div>
      </div>
    </div>
  );
}
