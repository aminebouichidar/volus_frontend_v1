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
    "linear-gradient(135deg, rgba(79,70,229,0.9), rgba(14,165,233,0.85))",
    "linear-gradient(135deg, rgba(236,72,153,0.9), rgba(99,102,241,0.85))",
    "linear-gradient(135deg, rgba(16,185,129,0.9), rgba(59,130,246,0.7))",
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
      animate={{
        backgroundColor: ["#030712", "#020617", "#050505"],
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="h-[32rem] w-full overflow-y-auto rounded-[32px] border border-white/10 p-10 backdrop-blur-xl shadow-[0_40px_120px_-60px_rgba(15,23,42,0.9)]"
    >
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 space-y-12">
          {content.map((item, index) => (
            <div key={`${item.title}-${index}`} className="space-y-4">
              <motion.h3
                initial={{ opacity: 0.3 }}
                animate={{ opacity: activeCard === index ? 1 : 0.35 }}
                transition={{ duration: 0.4 }}
                className="text-2xl font-semibold text-white"
              >
                {item.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0.3 }}
                animate={{ opacity: activeCard === index ? 1 : 0.35 }}
                transition={{ duration: 0.4 }}
                className="text-base text-gray-300 max-w-2xl"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-12" />
        </div>
        <div className="hidden lg:block w-80 flex-shrink-0">
          <div
            className={cn(
              "sticky top-6 h-72 w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl",
              contentClassName
            )}
            style={{
              background: gradients[activeCard % gradients.length],
            }}
          >
            {content[activeCard]?.content ?? null}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
