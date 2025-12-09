"use client";
import { Sparkles } from "@/app/ui/pricing/sparkles";
import { TimelineContent } from "@/app/ui/pricing/timeline-animation";
import { VerticalCutReveal } from "@/app/ui/pricing/vertical-cut-reveal";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { motion } from "motion/react";
import { useRef, useState } from "react";

const plans = [
  {
    name: "Starter",
    description:
      "Perfect for small businesses tracking essential product intelligence",
    price: 49,
    yearlyPrice: 499,
    buttonText: "Get started",
    buttonVariant: "outline" as const,
    includes: [
      "Track up to 10 products",
      "Real-time data from 5 platforms",
      "Basic sentiment analysis",
      "Weekly AI trend forecasts",
      "Email alerts",
      "Competitor price tracking",
      "Historical data (30 days)",
      "Basic dashboard & reports",
      "Community support",
    ],
  },
  {
    name: "Business",
    description:
      "Best value for growing businesses needing comprehensive market insights",
    price: 99,
    yearlyPrice: 1099,
    buttonText: "Get started",
    buttonVariant: "default" as const,
    popular: true,
    includes: [
      "Everything in Starter, plus:",
      "Track up to 50 products",
      "10+ data sources",
      "Advanced AI predictions & forecasts",
      "Real-time sentiment analysis",
      "Custom reports & analytics",
      "Competitor intelligence",
      "Historical data (6 months)",
      "Export to CSV/Excel",
      "Priority email support",
      "Team collaboration (5 users)",
    ],
  },
  {
    name: "Enterprise",
    description:
      "Unlimited access with priority support for data-driven organizations",
    price: 199,
    yearlyPrice: 2199,
    buttonText: "Get started",
    buttonVariant: "outline" as const,
    includes: [
      "Everything in Business, plus:",
      "Unlimited products tracking",
      "Full API access & webhooks",
      "Custom AI model training",
      "White-label reports",
      "Advanced data visualization",
      "Historical data (limited only by data availability)",
      "Dedicated account manager",
      "24/7 priority support",
      "Custom integrations",
      "Unlimited team members",
    ],
  },
];

const PricingSwitch = ({ onSwitch }: { onSwitch: (value: string) => void }) => {
  const [selected, setSelected] = useState("0");

  const handleSwitch = (value: string) => {
    setSelected(value);
    onSwitch(value);
  };

  return (
    <div className="flex justify-center">
      <div className="relative z-10 mx-auto flex w-fit rounded-full bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 p-1">
        <button
          onClick={() => handleSwitch("0")}
          className={cn(
            "relative z-10 w-fit h-10 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors cursor-pointer",
            selected === "0" ? "text-white" : "text-gray-400",
          )}
        >
          {selected === "0" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0 h-10 w-full rounded-full shadow-lg shadow-indigo-500/50 bg-gradient-to-r from-indigo-600 to-purple-600"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative">Monthly</span>
        </button>

        <button
          onClick={() => handleSwitch("1")}
          className={cn(
            "relative z-10 w-fit h-10 flex-shrink-0 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors cursor-pointer",
            selected === "1" ? "text-white" : "text-gray-400",
          )}
        >
          {selected === "1" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0 h-10 w-full rounded-full shadow-lg shadow-indigo-500/50 bg-gradient-to-r from-indigo-600 to-purple-600"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative flex items-center gap-2">Yearly</span>
        </button>
      </div>
    </div>
  );
};

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const pricingRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.4,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  const togglePricingPeriod = (value: string) =>
    setIsYearly(Number.parseInt(value) === 1);

  return (
    <div
      id="pricing"
      className="min-h-screen mx-auto relative overflow-x-hidden"
      ref={pricingRef}
    >
      {/* Gradient overlay for smooth transition from previous section */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 10%, transparent 25%)'
        }}
      />

      {/* Gradient background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[600px] opacity-30"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.3) 0%, rgba(99, 102, 241, 0.2) 30%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div 
          className="absolute top-1/4 right-0 w-[40%] h-[400px] opacity-20"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.3) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
        <div 
          className="absolute top-1/3 left-0 w-[40%] h-[400px] opacity-20"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(79, 70, 229, 0.25) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <TimelineContent
        animationNum={4}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="absolute top-0 h-96 w-screen overflow-hidden pointer-events-none"
      >
        <div
          style={{
            maskImage: 'radial-gradient(50% 50%, white, transparent)',
            WebkitMaskImage: 'radial-gradient(50% 50%, white, transparent)'
          }}
          className="w-full h-full"
        >
          <Sparkles
            density={1200}
            speed={0.3}
            minSpeed={0.1}
            color="#8b5cf6"
            opacity={0.7}
            minOpacity={0.3}
            opacitySpeed={2}
            options={{
              interactivity: {
                events: {
                  onHover: {
                    enable: false,
                  },
                  onClick: {
                    enable: false,
                  },
                },
              },
            }}
            className="absolute inset-x-0 bottom-0 h-full w-full"
          />
        </div>
      </TimelineContent>

      <article className="text-center mb-6 pt-32 max-w-3xl mx-auto space-y-2 relative z-10 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.15}
            staggerFrom="first"
            reverse={true}
            containerClassName="justify-center"
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 40,
              delay: 0,
            }}
          >
            Plans that works best for you
          </VerticalCutReveal>
        </h2>

        <TimelineContent
          as="p"
          animationNum={0}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="text-gray-400 text-lg"
        >
          Trusted by thousants, We help teams all around the world. Explore which
          option is right for you.
        </TimelineContent>

        <TimelineContent
          as="div"
          animationNum={1}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="pt-4"
        >
          <PricingSwitch onSwitch={togglePricingPeriod} />
        </TimelineContent>
      </article>

      <div className="grid md:grid-cols-3 max-w-6xl gap-6 py-6 mx-auto px-4 relative z-10">
        {plans.map((plan, index) => (
          <TimelineContent
            key={plan.name}
            as="div"
            animationNum={2 + index}
            timelineRef={pricingRef}
            customVariants={revealVariants}
          >
            <Card
              className={`relative text-white backdrop-blur-sm ${
                plan.popular
                  ? "bg-gradient-to-br from-indigo-950/50 via-purple-950/40 to-indigo-950/50 border-indigo-500/30 shadow-[0px_0px_60px_-15px_rgba(139,92,246,0.5)] z-20"
                  : "bg-gradient-to-br from-slate-900/40 via-slate-800/30 to-slate-900/40 border-slate-700/30 z-10"
              }`}
            >
              <CardHeader className="text-left ">
                <div className="flex justify-between">
                  <h3 className="text-3xl mb-2">{plan.name}</h3>
                </div>
                <div className="flex items-baseline">
                  <span className="text-4xl font-semibold ">
                    $
                    <NumberFlow
                      format={{
                        currency: "USD",
                      }}
                      value={isYearly ? plan.yearlyPrice : plan.price}
                      className="text-4xl font-semibold"
                    />
                  </span>
                  <span className="text-gray-300 ml-1">
                    /{isYearly ? "year" : "month"}
                  </span>
                </div>
                <p className="text-sm text-gray-300 mb-4">{plan.description}</p>
              </CardHeader>

              <CardContent className="pt-0">
                <button
                  className={`w-full mb-6 p-4 text-lg font-semibold rounded-xl transition-all duration-300 cursor-pointer ${
                    plan.popular
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/50 border border-indigo-400/50 text-white"
                      : plan.buttonVariant === "outline"
                        ? "bg-white/5 hover:bg-white/10 border border-slate-600/50 hover:border-slate-500 text-white backdrop-blur-sm"
                        : ""
                  }`}
                >
                  {plan.buttonText}
                </button>

                <div className="space-y-3 pt-4 border-t border-slate-700/30">
                  <h4 className="font-medium text-base mb-3">
                    {plan.includes[0]}
                  </h4>
                  <ul className="space-y-2">
                    {plan.includes.slice(1).map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-2"
                      >
                        <span className="h-2.5 w-2.5 bg-neutral-500 rounded-full grid place-content-center"></span>
                        <span className="text-sm text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TimelineContent>
        ))}
      </div>
    </div>
  );
}
