"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Layers, BarChart3, Zap, CheckCircle2, Sparkles } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const valuePillars = [
  {
    id: 1,
    name: "01",
    title: "Category Intelligence",
    subtitle: "Explore by Vertical",
    description:
      "Dive into 13 curated product categories—from electronics to cosmetics. Each reveals real-time rankings, emerging subcategories, and untapped market opportunities before your competitors see them.",
    icon: Layers,
    gradient: "from-indigo-500 via-purple-500 to-violet-600",
    glowColor: "indigo",
    benefits: [
      "13 categories with detailed subcategories",
      "Real-time product rankings",
      "Emerging niche detection",
      "Market gap identification",
    ],
    imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=90",
    stats: { label: "Categories", value: "13+" },
  },
  {
    id: 2,
    name: "02",
    title: "Trend Scoring Engine",
    subtitle: "AI-Powered Analysis",
    description:
      "Our proprietary algorithm combines sales velocity, social mentions, search growth, and 47 other signals into a dynamic trend score. See exactly why products rise—and predict when they'll peak.",
    icon: BarChart3,
    gradient: "from-cyan-500 via-blue-500 to-indigo-600",
    glowColor: "cyan",
    benefits: [
      "Multi-signal trend calculation",
      "Peak timing predictions",
      "Velocity & momentum tracking",
      "Competition density mapping",
    ],
    imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=90",
    stats: { label: "Data Signals", value: "47+" },
  },
  {
    id: 3,
    name: "03",
    title: "Smart Trend Alerts",
    subtitle: "Never Miss a Move",
    description:
      "Set custom alerts for your favorite categories. Get instant notifications when products break out, new trends emerge, or market conditions shift—so you're always first to act on opportunities.",
    icon: Zap,
    gradient: "from-amber-500 via-orange-500 to-rose-600",
    glowColor: "amber",
    benefits: [
      "Real-time breakout alerts",
      "Custom category watchlists",
      "Market shift warnings",
      "Competitor movement tracking",
    ],
    imageSrc: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&auto=format&fit=crop&q=90",
    stats: { label: "Avg Alert Time", value: "<2min" },
  },
];

export function AnimatedValueSection() {
  const [activeStep, setActiveStep] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const handleStepChange = useCallback((stepId: number) => {
    setActiveStep(stepId);
    setIsAutoPlaying(false);
    setProgress(0);
  }, []);

  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setProgress((prev) => prev + 2);
    }, 100);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Step change effect when progress completes
  useEffect(() => {
    if (progress >= 100) {
      setActiveStep((prev) => (prev === 3 ? 1 : prev + 1));
      setProgress(0);
    }
  }, [progress]);

  const activePillar = valuePillars.find((p) => p.id === activeStep) || valuePillars[0];

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.3em] text-indigo-300 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            How It Works
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            From Category to Opportunity
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400 leading-relaxed">
            Our AI-powered pipeline surfaces winning products in minutes—not weeks. 
            Here&apos;s how category intelligence becomes your competitive edge.
          </p>
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left Column: Step Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {valuePillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isActive = activeStep === pillar.id;
              
              return (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  onClick={() => handleStepChange(pillar.id)}
                  className="group relative cursor-pointer"
                >
                  {/* Card */}
                  <div
                    className={`relative rounded-2xl border p-6 transition-all duration-500 ${
                      isActive
                        ? "border-white/20 bg-white/[0.08] shadow-2xl"
                        : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]"
                    }`}
                  >
                    {/* Progress Bar for Active Step */}
                    {isActive && isAutoPlaying && (
                      <div className="absolute top-0 left-0 h-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" 
                           style={{ width: `${progress}%` }} />
                    )}

                    {/* Active Glow */}
                    {isActive && (
                      <motion.div
                        layoutId="pillarGlow"
                        className={`absolute -inset-px rounded-2xl bg-gradient-to-r ${pillar.gradient} opacity-20 blur-xl -z-10`}
                        transition={{ duration: 0.5 }}
                      />
                    )}

                    <div className="flex items-start gap-5">
                      {/* Step Number & Icon */}
                      <div className="relative">
                        <div
                          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border transition-all duration-500 ${
                            isActive
                              ? `bg-gradient-to-br ${pillar.gradient} border-white/20 shadow-lg`
                              : "border-white/10 bg-white/5"
                          }`}
                        >
                          <Icon className={`h-6 w-6 transition-colors duration-300 ${isActive ? "text-white" : "text-gray-400"}`} />
                        </div>
                        <span className={`absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                          isActive ? "bg-white text-black" : "bg-white/10 text-gray-400"
                        }`}>
                          {pillar.name}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-4 mb-2">
                          <h3 className={`text-xl font-semibold transition-colors duration-300 ${
                            isActive ? "text-white" : "text-gray-300 group-hover:text-white"
                          }`}>
                            {pillar.title}
                          </h3>
                          <span className={`text-xs uppercase tracking-wider px-2 py-1 rounded-full transition-all duration-300 ${
                            isActive ? "bg-white/10 text-white" : "text-gray-500"
                          }`}>
                            {pillar.subtitle}
                          </span>
                        </div>
                        <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                          isActive ? "text-gray-300" : "text-gray-500"
                        }`}>
                          {pillar.description}
                        </p>

                        {/* Stats Badge */}
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1.5"
                          >
                            <span className="text-xs text-gray-400">{pillar.stats.label}:</span>
                            <span className="text-sm font-semibold text-white">{pillar.stats.value}</span>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Auto-play toggle */}
            <div className="flex items-center justify-center gap-3 pt-4">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`text-xs uppercase tracking-wider transition-colors ${
                  isAutoPlaying ? "text-indigo-400" : "text-gray-500 hover:text-gray-400"
                }`}
              >
                {isAutoPlaying ? "● Auto-playing" : "○ Paused"}
              </button>
            </div>
          </motion.div>

          {/* Right Column: Visual Display */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] lg:aspect-[3/4]">
              {/* Outer Frame */}
              <div className="absolute inset-0 rounded-[32px] border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-2 backdrop-blur-sm shadow-2xl">
                {/* Inner Container */}
                <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-black">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0"
                    >
                      {/* Background Image */}
                      <Image
                        src={activePillar.imageSrc}
                        alt={activePillar.title}
                        fill
                        className="object-cover"
                        priority
                      />
                      
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent`} />
                      <div className={`absolute inset-0 bg-gradient-to-br ${activePillar.gradient} opacity-30 mix-blend-overlay`} />
                      
                      {/* Content Overlay */}
                      <div className="absolute inset-0 flex flex-col justify-end p-8">
                        {/* Icon Badge */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className={`mb-6 inline-flex self-start items-center gap-3 rounded-2xl bg-gradient-to-r ${activePillar.gradient} p-4 shadow-2xl`}
                        >
                          <activePillar.icon className="h-8 w-8 text-white" />
                          <div>
                            <p className="text-xs uppercase tracking-wider text-white/70">Step {activePillar.name}</p>
                            <p className="text-lg font-semibold text-white">{activePillar.title}</p>
                          </div>
                        </motion.div>

                        {/* Benefits Grid */}
                        <div className="space-y-3">
                          {activePillar.benefits.map((benefit, idx) => (
                            <motion.div
                              key={benefit}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + idx * 0.1 }}
                              className="flex items-center gap-3 bg-black/40 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10"
                            >
                              <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${activePillar.gradient}`}>
                                <CheckCircle2 className="h-4 w-4 text-white" />
                              </div>
                              <span className="text-sm text-gray-200">{benefit}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br ${activePillar.gradient} rounded-full blur-2xl opacity-30 transition-all duration-500`} />
              <div className={`absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br ${activePillar.gradient} rounded-full blur-3xl opacity-20 transition-all duration-500`} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
