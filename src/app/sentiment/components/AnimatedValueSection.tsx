"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Brain, ChartNoAxesCombined, TrendingUp, Check } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const valuePillars = [
  {
    id: 1,
    name: "Step 1",
    title: "Multi-Source Data Collection",
    description:
      "Aggregate sentiment signals from marketplace reviews, social media, search trends, and operational data into a unified emotional intelligence platform.",
    icon: ChartNoAxesCombined,
    gradient: "from-indigo-600/20 via-purple-600/10 to-transparent",
    benefits: [
      "38+ platform integrations",
      "Real-time data streaming",
      "Automated deduplication",
      "Cross-source correlation",
    ],
    imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Step 2",
    title: "AI-Powered Sentiment Analysis",
    description:
      "Advanced natural language processing identifies emotion patterns, emerging trends, and brand perception shifts across millions of customer touchpoints.",
    icon: Brain,
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    benefits: [
      "96% sentiment accuracy",
      "Multi-language support",
      "Emotion clustering & themes",
      "Predictive trend detection",
    ],
    imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Step 3",
    title: "Actionable Insights & Alerts",
    description:
      "Transform raw sentiment data into strategic recommendations with real-time alerts, executive dashboards, and attribution to brand, SKU, region, and campaign.",
    icon: TrendingUp,
    gradient: "from-violet-500/20 via-fuchsia-500/10 to-transparent",
    benefits: [
      "Real-time spike alerts",
      "Executive-ready reports",
      "Campaign attribution",
      "Competitive benchmarking",
    ],
    imageSrc: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format&fit=crop&q=80",
  },
];

const stepVariants = {
  inactive: { scale: 0.95, opacity: 0.6 },
  active: { scale: 1, opacity: 1 },
};

function StepsNav({
  current,
  onChange,
}: {
  current: number;
  onChange: (index: number) => void;
}) {
  return (
    <nav aria-label="Value pillars" className="flex justify-center px-4">
      <ol className="flex w-full flex-wrap items-center justify-center gap-3" role="list">
        {valuePillars.map((step, stepIdx) => {
          const isCompleted = current > stepIdx;
          const isCurrent = current === stepIdx;
          return (
            <motion.li
              key={step.id}
              initial="inactive"
              animate={isCurrent ? "active" : "inactive"}
              variants={stepVariants}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <button
                type="button"
                className={`group flex items-center gap-2.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                  isCurrent
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                    : "border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
                onClick={() => onChange(stepIdx)}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                    isCompleted
                      ? "bg-indigo-500 text-white"
                      : isCurrent
                        ? "bg-indigo-400 text-indigo-900"
                        : "bg-white/10 text-gray-400 group-hover:bg-white/20"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <span>{stepIdx + 1}</span>
                  )}
                </span>
                <span className="hidden sm:inline-block">{step.name}</span>
              </button>
            </motion.li>
          );
        })}
      </ol>
    </nav>
  );
}

export function AnimatedValueSection() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleStepChange = useCallback((index: number) => {
    setCurrentStep(index);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentStep((prev) => (prev + 1) % valuePillars.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentStep]);

  const currentPillar = valuePillars[currentStep];
  const Icon = currentPillar.icon;

  return (
    <section className="relative px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.3em] text-purple-300">
            Value
          </span>
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Give your CX, marketing, and revenue teams one heartbeat.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Subscribers unlock proactive intelligence with automated storytelling,
            executive-ready reports, and the context needed to move faster than the market.
          </p>
        </motion.div>

        {/* Feature Card */}
        <div className="relative mb-12 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] shadow-2xl backdrop-blur-xl">
          <div className="grid gap-0 lg:grid-cols-2">
            {/* Left: Content */}
            <div className="p-10 lg:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex h-full flex-col"
                >
                  <motion.div
                    className="mb-4 text-sm font-semibold uppercase tracking-wider text-indigo-400"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {currentPillar.name}
                  </motion.div>

                  <motion.div
                    className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10"
                    style={{
                      background: `linear-gradient(135deg, ${currentPillar.gradient})`,
                    }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </motion.div>

                  <motion.h3
                    className="mb-4 text-3xl font-bold text-white md:text-4xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {currentPillar.title}
                  </motion.h3>

                  <motion.p
                    className="mb-8 text-base leading-relaxed text-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    {currentPillar.description}
                  </motion.p>

                  <motion.ul
                    className="space-y-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {currentPillar.benefits.map((benefit, idx) => (
                      <motion.li
                        key={benefit}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 + idx * 0.05 }}
                        className="flex items-start gap-3 text-sm text-gray-300"
                      >
                        <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-400" />
                        <span>{benefit}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Image */}
            <div className="relative min-h-[400px] lg:min-h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentPillar.imageSrc}
                    alt={currentPillar.title}
                    fill
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0 opacity-60"
                    style={{
                      background: `linear-gradient(135deg, ${currentPillar.gradient})`,
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Steps Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <StepsNav current={currentStep} onChange={handleStepChange} />
        </motion.div>
      </div>
    </section>
  );
}
