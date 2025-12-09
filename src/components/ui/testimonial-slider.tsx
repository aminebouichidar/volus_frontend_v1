"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface Testimonial {
  img: string;
  quote: string;
  name: string;
  role: string;
}

export const TestimonialSlider = ({
  testimonials,
}: {
  testimonials: Testimonial[];
}) => {
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number>(0);
  const [autorotate, setAutorotate] = useState<boolean>(true);
  const autorotateTiming: number = 7000;

  useEffect(() => {
    if (!autorotate) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1 === testimonials.length ? 0 : prev + 1));
    }, autorotateTiming);
    return () => clearInterval(interval);
  }, [active, autorotate, testimonials.length]);

  const heightFix = () => {
    if (testimonialsRef.current && testimonialsRef.current.parentElement) {
      testimonialsRef.current.parentElement.style.height = `${testimonialsRef.current.clientHeight}px`;
    }
  };

  useEffect(() => {
    heightFix();
  }, []);

  return (
    <div className="mx-auto w-full max-w-3xl text-center">
      {/* Image Container */}
      <div className="relative h-32 mb-8">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-gradient-to-b before:from-indigo-500/25 before:via-indigo-500/5 before:via-25% before:to-indigo-500/0 before:to-75%">
          <div className="h-32 [mask-image:_linear-gradient(0deg,transparent,theme(colors.white)_20%,theme(colors.white))]">
            <AnimatePresence mode="wait">
              {testimonials.map((testimonial, index) => (
                active === index && (
                  <motion.div
                    key={index}
                    className="absolute inset-0 -z-10 h-full"
                    initial={{ opacity: 0, rotate: -60 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 60 }}
                    transition={{ duration: 0.7, ease: [0.68, -0.3, 0.32, 1] }}
                  >
                    <Image
                      className="relative left-1/2 top-11 -translate-x-1/2 rounded-full border border-indigo-500/30 shadow-lg shadow-indigo-500/20"
                      src={testimonial.img}
                      width={56}
                      height={56}
                      alt={testimonial.name}
                    />
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Quote Container */}
      <div className="mb-9 transition-all delay-300 duration-150 ease-in-out">
        <div className="relative flex flex-col" ref={testimonialsRef}>
          <AnimatePresence mode="wait" onExitComplete={heightFix}>
            {testimonials.map((testimonial, index) => (
              active === index && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
                  onAnimationStart={heightFix}
                  className="text-2xl font-medium text-zinc-200 before:content-['\201C'] after:content-['\201D']"
                >
                  {testimonial.quote}
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Buttons */}
      <div className="-m-1.5 flex flex-wrap justify-center">
        {testimonials.map((testimonial, index) => (
          <button
            key={index}
            className={cn(
              "m-1.5 inline-flex justify-center whitespace-nowrap rounded-full px-3 py-1.5 text-xs shadow-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300",
              active === index
                ? "bg-indigo-600 text-white shadow-indigo-950/10"
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
            )}
            onClick={() => {
              setActive(index);
              setAutorotate(false);
            }}
          >
            <span className="font-semibold">{testimonial.name}</span>{" "}
            <span
              className={cn(
                "mx-1",
                active === index ? "text-indigo-200" : "text-zinc-600"
              )}
            >
              -
            </span>{" "}
            <span>{testimonial.role}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
