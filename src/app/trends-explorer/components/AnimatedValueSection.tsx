"use client";

import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Search, DollarSign, Check } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const valuePillars = [
  {
    id: 1,
    name: "Step 1",
    title: "Cross-Platform Scanning",
    description:
      "We monitor Amazon, TikTok, Meta, and Google simultaneously to catch products that are heating up on one platform before they explode everywhere.",
    icon: Search,
    gradient: "from-indigo-600/20 via-purple-600/10 to-transparent",
    benefits: [
      "Real-time velocity tracking",
      "Viral content detection",
      "Cross-channel correlation",
      "Early mover advantage",
    ],
    imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Step 2",
    title: "Profitability Analysis",
    description:
      "Don't just find trends, find profits. We analyze margins, competition density, and sourcing costs to validate viability before you invest.",
    icon: DollarSign,
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    benefits: [
      "Margin estimation",
      "Competition density heatmaps",
      "Sourcing cost benchmarks",
      "Saturation warnings",
    ],
    imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Step 3",
    title: "Trend Forecasting",
    description:
      "Our AI predicts the lifespan of a trend. Is it a 2-week fad or a 6-month staple? Know exactly when to enter and when to exit.",
    icon: TrendingUp,
    gradient: "from-violet-500/20 via-fuchsia-500/10 to-transparent",
    benefits: [
      "Lifespan prediction",
      "Seasonality adjustments",
      "Exit strategy alerts",
      "Inventory planning",
    ],
    imageSrc: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format&fit=crop&q=80",
  },
];

export function AnimatedValueSection() {
  const [activeStep, setActiveStep] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const handleStepChange = useCallback((stepId: number) => {
    setActiveStep(stepId);
    setIsAutoPlaying(false);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev === 3 ? 1 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const activePillar = valuePillars.find((p) => p.id === activeStep) || valuePillars[0];

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Gradient masks for smooth transitions */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/0 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/0 to-transparent pointer-events-none" />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            From Signal to Sale in Three Steps
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Stop guessing what to sell. Our pipeline validates demand, profitability, and longevity so you can launch with confidence.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left Column: Navigation */}
          <div className="space-y-8">
            {valuePillars.map((pillar) => (
              <div
                key={pillar.id}
                onClick={() => handleStepChange(pillar.id)}
                className={`group relative cursor-pointer rounded-2xl border p-6 transition-all duration-300 ${
                  activeStep === pillar.id
                    ? "border-indigo-500/50 bg-white/5 shadow-2xl shadow-indigo-500/10"
                    : "border-white/5 bg-transparent hover:border-white/10 hover:bg-white/[0.02]"
                }`}
              >
                {activeStep === pillar.id && (
                  <motion.div
                    layoutId="activeGlow"
                    className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-xl"
                    transition={{ duration: 0.5 }}
                  />
                )}
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300 ${
                      activeStep === pillar.id
                        ? "border-indigo-500/50 bg-indigo-500/20 text-indigo-300"
                        : "border-white/10 bg-white/5 text-gray-400 group-hover:text-gray-300"
                    }`}
                  >
                    <pillar.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3
                      className={`text-xl font-semibold transition-colors duration-300 ${
                        activeStep === pillar.id ? "text-white" : "text-gray-400 group-hover:text-gray-200"
                      }`}
                    >
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-400">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Visuals */}
          <div className="relative aspect-square lg:aspect-auto lg:h-[600px]">
            <div className="absolute inset-0 rounded-3xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm">
              <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${activePillar.gradient} opacity-30`} />
                    
                    {/* Placeholder for actual UI/Image - using a gradient/pattern for now if image fails, or the image itself */}
                    <div className="h-full w-full bg-grid-white/[0.05] relative">
                        {/* Abstract representation of the step */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <activePillar.icon className="w-32 h-32 text-white/5" />
                        </div>
                        
                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                            <h4 className="text-lg font-semibold text-white mb-4">Key Capabilities</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {activePillar.benefits.map((benefit, idx) => (
                                    <motion.div 
                                        key={benefit}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex items-center gap-2"
                                    >
                                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300">
                                            <Check className="h-3 w-3" />
                                        </div>
                                        <span className="text-sm text-gray-300">{benefit}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
