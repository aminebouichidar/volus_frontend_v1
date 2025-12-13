"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

interface StickyScrollProps {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
}

export const StickyScroll: React.FC<StickyScrollProps> = ({
  content,
  contentClassName,
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start start", "end start"],
  });

  const gradients = [
    "linear-gradient(135deg, rgba(59,130,246,0.3), rgba(14,165,233,0.2))",
    "linear-gradient(135deg, rgba(168,85,247,0.3), rgba(99,102,241,0.2))",
    "linear-gradient(135deg, rgba(16,185,129,0.3), rgba(59,130,246,0.2))",
    "linear-gradient(135deg, rgba(236,72,153,0.3), rgba(168,85,247,0.2))",
    "linear-gradient(135deg, rgba(245,158,11,0.3), rgba(236,72,153,0.2))",
  ];

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const breakpoints = content.map((_, index) => index / content.length);
    const closestIndex = breakpoints.reduce((closest, breakpoint, index) => {
      const distance = Math.abs(latest - breakpoint);
      return distance < Math.abs(latest - breakpoints[closest]) ? index : closest;
    }, 0);

    setActiveCard(closestIndex);
  });

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollTop = 0;
  }, [content]);

  return (
    <motion.div
      ref={containerRef}
      className="h-[36rem] w-full overflow-y-auto rounded-3xl bg-transparent p-8 md:p-12 scrollbar-hide"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Text Content */}
        <div className="flex-1 space-y-16 lg:space-y-20">
          {content.map((item, index) => (
            <motion.div 
              key={`${item.title}-${index}`} 
              className="space-y-4"
              initial={{ opacity: 0.3 }}
              animate={{ 
                opacity: activeCard === index ? 1 : 0.25,
                x: activeCard === index ? 0 : -10,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="flex items-center gap-4">
                <span className={cn(
                  "inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-all duration-300",
                  activeCard === index 
                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" 
                    : "bg-white/5 text-gray-500 border border-white/10"
                )}>
                  {index + 1}
                </span>
                <h3 className={cn(
                  "text-2xl lg:text-3xl font-bold transition-colors duration-300",
                  activeCard === index ? "text-white" : "text-gray-500"
                )}>
                  {item.title}
                </h3>
              </div>
              <p className={cn(
                "text-base lg:text-lg leading-relaxed max-w-xl pl-12 transition-colors duration-300",
                activeCard === index ? "text-gray-300" : "text-gray-600"
              )}>
                {item.description}
              </p>
            </motion.div>
          ))}
          <div className="h-24" />
        </div>

        {/* Visual Content */}
        <div className="hidden lg:block w-[340px] flex-shrink-0">
          <motion.div
            className={cn(
              "sticky top-8 h-80 w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50",
              contentClassName
            )}
            style={{
              background: gradients[activeCard % gradients.length],
            }}
            animate={{
              background: gradients[activeCard % gradients.length],
            }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              key={activeCard}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="h-full w-full"
            >
              {content[activeCard]?.content ?? null}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
