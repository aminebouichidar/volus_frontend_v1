"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const AnimatedTextBackground = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("select-none", className)}
    >
      <defs>
        <linearGradient id="animatedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>

        <motion.linearGradient
          id="revealGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
          animate={{
            x1: ["-100%", "100%"],
            x2: ["0%", "200%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 0.5,
          }}
        >
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="white" />
          <stop offset="100%" stopColor="transparent" />
        </motion.linearGradient>

        <mask id="textRevealMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#revealGradient)" />
        </mask>
      </defs>

      {/* Base text with subtle stroke */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-neutral-200/30 font-[helvetica] text-7xl font-bold"
      >
        {text}
      </text>

      {/* Animated gradient text */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#animatedGradient)"
        strokeWidth="0.3"
        mask="url(#textRevealMask)"
        className="fill-transparent font-[helvetica] text-7xl font-bold"
      >
        {text}
      </text>
    </svg>
  );
};
