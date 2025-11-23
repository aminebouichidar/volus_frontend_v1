'use client'
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface GradientCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  learnMoreLink?: string;
  index?: number;
}

export const GradientCard: React.FC<GradientCardProps> = ({ 
  title, 
  description, 
  icon,
  learnMoreLink = "#",
  index = 0
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // GSAP Scroll Animation
  useEffect(() => {
    if (cardRef.current) {
      const element = cardRef.current;
      
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 100,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: element,
            start: "top bottom-=100",
            end: "top center",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [index]);

  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();

      // Calculate mouse position relative to card center
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Calculate rotation (limited range for subtle effect)
      const rotateX = -(y / rect.height) * 5; // Max 5 degrees rotation
      const rotateY = (x / rect.width) * 5; // Max 5 degrees rotation

      setRotation({ x: rotateX, y: rotateY });
    }
  };

  // Reset rotation when not hovering
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative rounded-3xl overflow-hidden w-full"
      style={{
        transformStyle: "preserve-3d",
        backgroundColor: "#0e131f",
        boxShadow: "0 -10px 100px 10px rgba(78, 99, 255, 0.25), 0 0 10px 0 rgba(0, 0, 0, 0.5)",
        height: "350px", // Reduced from 450px
      }}
      initial={{ y: 0 }}
      animate={{
        y: isHovered ? -5 : 0,
        rotateX: rotation.x,
        rotateY: rotation.y,
        perspective: 1000,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Subtle glass reflection overlay */}
      <motion.div
        className="absolute inset-0 z-35 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.05) 100%)",
          backdropFilter: "blur(2px)",
        }}
        animate={{
          opacity: isHovered ? 0.7 : 0.5,
          rotateX: -rotation.x * 0.2,
          rotateY: -rotation.y * 0.2,
          z: 1,
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut"
        }}
      />

      {/* Dark background with black gradient */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(180deg, #000000 0%, #000000 70%)",
        }}
        animate={{
          z: -1
        }}
      />

      {/* Noise texture overlay */}
      <motion.div
        className="absolute inset-0 opacity-30 mix-blend-overlay z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        animate={{
          z: -0.5
        }}
      />

      {/* Subtle finger smudge texture for realism */}
      <motion.div
        className="absolute inset-0 opacity-10 mix-blend-soft-light z-11 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='smudge'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.01' numOctaves='3' seed='5' stitchTiles='stitch'/%3E%3CfeGaussianBlur stdDeviation='10'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23smudge)'/%3E%3C/svg%3E")`,
          backdropFilter: "blur(1px)",
        }}
        animate={{
          z: -0.25
        }}
      />

      {/* Purple/blue glow effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-2/3 z-20"
        style={{
          background: `
            radial-gradient(ellipse at bottom right, rgba(172, 92, 255, 0.7) -10%, rgba(79, 70, 229, 0) 70%),
            radial-gradient(ellipse at bottom left, rgba(56, 189, 248, 0.7) -10%, rgba(79, 70, 229, 0) 70%)
          `,
          filter: "blur(40px)",
        }}
        animate={{
          opacity: isHovered ? 0.9 : 0.8,
          y: isHovered ? rotation.x * 0.5 : 0,
          z: 0
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut"
        }}
      />

      {/* Central purple glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-2/3 z-21"
        style={{
          background: `
            radial-gradient(circle at bottom center, rgba(161, 58, 229, 0.7) -20%, rgba(79, 70, 229, 0) 60%)
          `,
          filter: "blur(45px)",
        }}
        animate={{
          opacity: isHovered ? 0.85 : 0.75,
          y: isHovered ? `calc(10% + ${rotation.x * 0.3}px)` : "10%",
          z: 0
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut"
        }}
      />

      {/* Enhanced bottom border glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] z-25"
        style={{
          background: "linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0.05) 100%)",
        }}
        animate={{
          boxShadow: isHovered
            ? "0 0 20px 4px rgba(172, 92, 255, 0.9), 0 0 30px 6px rgba(138, 58, 185, 0.7), 0 0 40px 8px rgba(56, 189, 248, 0.5)"
            : "0 0 15px 3px rgba(172, 92, 255, 0.8), 0 0 25px 5px rgba(138, 58, 185, 0.6), 0 0 35px 7px rgba(56, 189, 248, 0.4)",
          opacity: isHovered ? 1 : 0.9,
          z: 0.5
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut"
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 h-1/4 w-[1px] z-25 rounded-full"
        style={{
          background: "linear-gradient(to top, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 20%, rgba(255, 255, 255, 0.3) 40%, rgba(255, 255, 255, 0.1) 60%, rgba(255, 255, 255, 0) 80%)",
        }}
        animate={{
          boxShadow: isHovered
            ? "0 0 20px 4px rgba(172, 92, 255, 0.9), 0 0 30px 6px rgba(138, 58, 185, 0.7), 0 0 40px 8px rgba(56, 189, 248, 0.5)"
            : "0 0 15px 3px rgba(172, 92, 255, 0.8), 0 0 25px 5px rgba(138, 58, 185, 0.6), 0 0 35px 7px rgba(56, 189, 248, 0.4)",
          opacity: isHovered ? 1 : 0.9,
          z: 0.5
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut"
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 h-1/4 z-25"
        style={{
          background: "linear-gradient(to top, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.55) 15%, rgba(255, 255, 255, 0.4) 30%, rgba(255, 255, 255, 0.25) 45%, rgba(255, 255, 255, 0.1) 70%, rgba(255, 255, 255, 0) 85%)",
        }}
        animate={{
          boxShadow: isHovered
            ? "0 0 20px 4px rgba(172, 92, 255, 0.9), 0 0 30px 6px rgba(138, 58, 185, 0.7), 0 0 40px 8px rgba(56, 189, 248, 0.5)"
            : "0 0 15px 3px rgba(172, 92, 255, 0.8), 0 0 25px 5px rgba(138, 58, 185, 0.6), 0 0 35px 7px rgba(56, 189, 248, 0.4)",
          opacity: isHovered ? 1 : 0.9,
          z: 0.5
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut"
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 h-1/4 w-[1px] z-25 rounded-full"
        style={{
          background: "linear-gradient(to top, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 20%, rgba(255, 255, 255, 0.3) 40%, rgba(255, 255, 255, 0.1) 60%, rgba(255, 255, 255, 0) 80%)",
        }}
        animate={{
          boxShadow: isHovered
            ? "0 0 20px 4px rgba(172, 92, 255, 0.9), 0 0 30px 6px rgba(138, 58, 185, 0.7), 0 0 40px 8px rgba(56, 189, 248, 0.5)"
            : "0 0 15px 3px rgba(172, 92, 255, 0.8), 0 0 25px 5px rgba(138, 58, 185, 0.6), 0 0 35px 7px rgba(56, 189, 248, 0.4)",
          opacity: isHovered ? 1 : 0.9,
          z: 0.5
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut"
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 h-1/3 z-25"
        style={{
          background: "linear-gradient(to top, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.55) 15%, rgba(255, 255, 255, 0.4) 30%, rgba(255, 255, 255, 0.25) 45%, rgba(255, 255, 255, 0.1) 70%, rgba(255, 255, 255, 0) 85%)",
        }}
        animate={{
          boxShadow: isHovered
            ? "0 0 20px 4px rgba(172, 92, 255, 0.9), 0 0 30px 6px rgba(138, 58, 185, 0.7), 0 0 40px 8px rgba(56, 189, 248, 0.5)"
            : "0 0 15px 3px rgba(172, 92, 255, 0.8), 0 0 25px 5px rgba(138, 58, 185, 0.6), 0 0 35px 7px rgba(56, 189, 248, 0.4)",
          opacity: isHovered ? 1 : 0.9,
          z: 0.5
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut"
        }}
      />

      {/* Card content */}
      <motion.div
        className="relative flex flex-col h-full p-6 z-40"
        animate={{
          z: 2
        }}
      >
        {/* Icon circle with shadow */}
        <motion.div
          className="w-11 h-11 rounded-full flex items-center justify-center mb-5"
          style={{
            background: "linear-gradient(225deg, #171c2c 0%, #121624 100%)",
            position: "relative",
            overflow: "hidden"
          }}
          initial={{ filter: "blur(3px)", opacity: 0.7 }}
          animate={{
            filter: "blur(0px)",
            opacity: 1,
            boxShadow: isHovered
              ? "0 8px 16px -2px rgba(0, 0, 0, 0.3), 0 4px 8px -1px rgba(0, 0, 0, 0.2), inset 2px 2px 5px rgba(255, 255, 255, 0.15), inset -2px -2px 5px rgba(0, 0, 0, 0.7)"
              : "0 6px 12px -2px rgba(0, 0, 0, 0.25), 0 3px 6px -1px rgba(0, 0, 0, 0.15), inset 1px 1px 3px rgba(255, 255, 255, 0.12), inset -2px -2px 4px rgba(0, 0, 0, 0.5)",
            z: isHovered ? 10 : 5,
            y: isHovered ? -2 : 0,
            rotateX: isHovered ? -rotation.x * 0.5 : 0,
            rotateY: isHovered ? -rotation.y * 0.5 : 0
          }}
          transition={{
            duration: 0.4,
            ease: "easeOut"
          }}
        >
          {/* Top-left highlight for realistic lighting */}
          <div
            className="absolute top-0 left-0 w-2/3 h-2/3 opacity-40"
            style={{
              background: "radial-gradient(circle at top left, rgba(255, 255, 255, 0.5), transparent 80%)",
              pointerEvents: "none",
              filter: "blur(10px)"
            }}
          />

          {/* Bottom shadow for depth */}
          <div
            className="absolute bottom-0 left-0 w-full h-1/2 opacity-50"
            style={{
              background: "linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent)",
              pointerEvents: "none",
              backdropFilter: "blur(3px)"
            }}
          />

          {/* Icon */}
          <div className="flex items-center justify-center w-full h-full relative z-10 text-white">
            {icon}
          </div>
        </motion.div>

        {/* Content positioning */}
        <motion.div
          className="mb-auto"
          animate={{
            z: isHovered ? 5 : 2,
            rotateX: isHovered ? -rotation.x * 0.3 : 0,
            rotateY: isHovered ? -rotation.y * 0.3 : 0
          }}
          transition={{
            duration: 0.4,
            ease: "easeOut"
          }}
        >
          <motion.h3
            className="text-xl font-medium text-white mb-2.5 leading-snug"
            style={{
              letterSpacing: "-0.01em",
            }}
            initial={{ filter: "blur(3px)", opacity: 0.7 }}
            animate={{
              textShadow: isHovered ? "0 2px 4px rgba(0,0,0,0.2)" : "none",
              filter: "blur(0px)",
              opacity: 1,
              transition: { duration: 1.2, delay: 0.2 }
            }}
          >
            {title}
          </motion.h3>

          <motion.p
            className="text-sm mb-5 text-gray-300 leading-relaxed"
            style={{
              fontWeight: 350,
            }}
            initial={{ filter: "blur(3px)", opacity: 0.7 }}
            animate={{
              textShadow: isHovered ? "0 1px 2px rgba(0,0,0,0.1)" : "none",
              filter: "blur(0px)",
              opacity: 0.85,
              transition: { duration: 1.2, delay: 0.4 }
            }}
          >
            {description}
          </motion.p>

          {/* Learn More with arrow */}
          <motion.a
            href={learnMoreLink}
            className="inline-flex items-center text-white text-sm font-medium group"
            initial={{ filter: "blur(3px)", opacity: 0.7 }}
            animate={{
              filter: "blur(0px)",
              opacity: 0.9,
              transition: { duration: 1.2, delay: 0.6 }
            }}
            whileHover={{
              filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))"
            }}
          >
            Learn More
            <motion.svg
              className="ml-1 w-4 h-4"
              width="8"
              height="8"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              animate={{
                x: isHovered ? 4 : 0
              }}
              transition={{
                duration: 0.6,
                ease: "easeOut"
              }}
            >
              <path
                d="M1 8H15M15 8L8 1M15 8L8 15"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
