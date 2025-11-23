"use client";

import * as React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  highlightText?: string;
  textClassName?: string;
  underlineClassName?: string;
  underlinePath?: string;
  underlineHoverPath?: string;
  underlineDuration?: number;
}

const AnimatedText = React.forwardRef<HTMLDivElement, AnimatedTextProps>(
  (
    {
      text,
      highlightText,
      textClassName,
      underlineClassName,
      underlinePath = "M 0,10 Q 75,0 150,10 Q 225,20 300,10",
      underlineHoverPath = "M 0,10 Q 75,20 150,10 Q 225,0 300,10",
      underlineDuration = 1.5,
      ...props
    },
    ref
  ) => {
    const pathVariants: Variants = {
      hidden: {
        pathLength: 0,
        opacity: 0,
      },
      visible: {
        pathLength: 1,
        opacity: 1,
        transition: {
          duration: underlineDuration,
          ease: "easeInOut",
        },
      },
    };

    // Split text by <br /> tags first
    const lines = text.split(/<br\s*\/?>/);

    // Split each line into parts if highlightText is provided
    const renderLines = lines.map((line, lineIdx) => {
      const parts = highlightText
        ? line.split(new RegExp(`(${highlightText})`, "i"))
        : [line];

      return (
        <React.Fragment key={lineIdx}>
          {parts.map((part, partIdx) => (
            <span key={partIdx} className={part.toLowerCase() === highlightText?.toLowerCase() ? "relative" : ""}>
              {part}
            </span>
          ))}
          {lineIdx < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });

    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-start justify-center gap-2", props.className)}
      >
        <div className="relative inline-block">
          <motion.h1
            className={cn("text-4xl font-bold", textClassName)}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            {renderLines}
          </motion.h1>

          {highlightText && (
            <motion.svg
              width="100%"
              height="20"
              viewBox="0 0 300 20"
              className={cn("absolute -bottom-4 left-0", underlineClassName)}
              style={{
                marginLeft: "auto",
              }}
            >
              <motion.path
                d={underlinePath}
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                whileHover={{
                  d: underlineHoverPath,
                  transition: { duration: 0.8 },
                }}
              />
            </motion.svg>
          )}
        </div>
      </div>
    );
  }
);

AnimatedText.displayName = "AnimatedText";

export { AnimatedText };
